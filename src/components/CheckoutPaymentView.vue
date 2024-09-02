<template>
  <div v-if="checkout.data.id != null && checkout.data.shippingLine != null">
    <div style="display: flex; align-items: center; margin-bottom: 32px">
      <div class="bread-title-active" @click="setTabIndexs(0)">Information</div>
      <img
        src="../assets/icons/arrow-right-grey.png"
        style="height: 11px; margin: 0 14px"
      />
      <div class="bread-title-active" @click="setTabIndexs(1)">Shipping</div>
      <img
        src="../assets/icons/arrow-right-grey.png"
        style="height: 11px; margin: 0 14px"
      />
      <div class="bread-title-active">Payment</div>
    </div>
    <div style="font-size: 12px; line-height: 17px; display: flex">
      <div style="width: 60px; color: #757575">Contact</div>
      <div style="color: #424242">{{ accountStore.customer.data.email }}</div>
    </div>
    <div style="border-top: 1px solid #eee; margin: 8px 0"></div>
    <div style="font-size: 12px; line-height: 17px; display: flex">
      <div style="width: 60px; color: #757575">Ship to</div>
      <div style="color: #424242">
        <div style="color: #424242">
          {{ checkout.address.firstName }} {{ checkout.address.lastName }}
          {{ checkout.address.address1 }} {{ checkout.address.address2 }}
          {{ checkout.address.city }} {{ checkout.address.province }}
          {{ checkout.address.country }} {{ checkout.address.zip }}
        </div>
      </div>
    </div>
    <div style="border-top: 1px solid #eee; margin: 8px 0"></div>
    <div style="font-size: 12px; line-height: 17px; display: flex">
      <div style="width: 60px; color: #757575">Method</div>
      <div style="color: #424242">{{ checkout.data.shippingLine.title }}</div>
    </div>
    <div class="title">Payment</div>
    <div class="sub-title">All transactions are secure and encrypted</div>
    <div style="padding: 16px; border: 1px solid #eee; border-radius: 2px">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        "
      >
        <div>Credit or Debit Card</div>
        <img src="../assets/icons/cards.png" height="24px" />
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        label-width="auto"
        label-position="top"
        scroll-to-error
        hide-required-asterisk
      >
        <div>
          <el-form-item label="Card number" prop="num">
            <el-input
              v-model="form.num"
              style="height: 40px"
              placeholder="Card number"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="Cardholder name" prop="name">
            <el-input
              v-model="form.name"
              style="height: 40px"
              placeholder="Name on card"
            />
          </el-form-item>
        </div>
        <div style="display: flex">
          <div style="width: 134px">
            <el-form-item label="Expiration date" prop="date">
              <el-input
                v-model="form.date"
                style="height: 40px"
                placeholder="MM / YY"
              />
            </el-form-item>
          </div>
          <div style="width: 134px; margin: 0 16px">
            <el-form-item label="Security code" prop="code">
              <el-input
                v-model="form.code"
                style="height: 40px"
                placeholder="Security code"
              >
                <template #suffix>
                  <img src="../assets/icons/tip.png" style="height: 16px" />
                </template>
              </el-input>
            </el-form-item>
          </div>
          <img
            src="../assets/icons/card.png"
            style="height: 32px; margin-top: 34px"
          />
        </div>
      </el-form>
    </div>
    <div class="title">Billing Address</div>
    <div class="sub-title">
      Select the address that matches your card or payment method
    </div>
    <div class="address-select">
      <img src="../assets/icons/select-y.png" style="width: 16px" />
      <div style="flex: 1; margin: 0 16px">Same as shipping address</div>
    </div>
    <div class="address">
      <img src="../assets/icons/select-n.png" style="width: 16px" />
      <div style="flex: 1; margin: 0 16px">Use different billing address</div>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 64px 0;
      "
    >
      <div style="margin-right: 24px; display: flex; align-items: center">
        <img src="../assets/icons/arrow-left.png" style="height: 16px" />
        <div style="margin-left: 6px">Return to shipping</div>
      </div>
      <div
        v-loading="checkoutCompleteLoading"
        @click="onSubmit"
        style="
          height: 48px;
          width: 200px;
          font-size: 16px;
          font-weight: bold;
          background-color: #212121;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        Place order
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAccountStore } from '../stores/account'
import { useMutation } from '@vue/apollo-composable'
import { CheckoutSchemas } from '@/server/graphql/schema/checkout_schema'

const accountStore = useAccountStore()

const { checkout } = defineProps({
  checkout: {
    type: Object,
  },
})

const emit = defineEmits(['setTabIndex'])

const ruleFormRef = ref(null)

const form = reactive({
  num: '',
  name: '',
  date: '',
  code: '',
})

function onSubmit() {
  if (parseFloat(checkout.data.totalPriceV2.amount) == 0) {
    checkoutComplete({
      checkoutId: checkout.data.id,
    })
  }
}

const {
  mutate: checkoutComplete,
  loading: checkoutCompleteLoading,
  onDone: checkoutCompleteOnDone,
} = useMutation(CheckoutSchemas.checkoutCompleteFree)

checkoutCompleteOnDone((result) => {
  console.log(result)
  setTabIndexs(3)
})

function setTabIndexs(index) {
  emit('setTabIndex', index)
}
</script>

<style scoped>
.bread-title {
  font-size: 12px;
  line-height: 16px;
  color: #bdbdbd;
}
.bread-title-active {
  font-size: 12px;
  line-height: 16px;
  color: #212121;
}
.title {
  font-size: 20px;
  line-height: 24px;
  margin: 32px 0;
}
.sub-title {
  line-height: 20px;
  color: #616161;
  margin-top: 8px;
  margin-bottom: 32px;
}
.address {
  margin-top: 8px;
  border: 1px solid #9e9e9e;
  height: 56px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-radius: 2px;
}
.address-select {
  margin-top: 32px;
  border: 1px solid #9e9e9e;
  height: 56px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-radius: 2px;
  background-color: #fafafa;
}
</style>
