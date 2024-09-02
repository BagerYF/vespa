<template>
  <div v-if="checkout.data.id != null">
    <div v-if="checkout.tabIndex != 3">
      <div style="font-size: 12px; line-height: 16px; margin-bottom: 6px">
        Add a gift code or discount code
      </div>
      <div style="display: flex">
        <el-input
          v-model="discountInput"
          class="input"
          placeholder="Code Number"
        />
        <div
          v-loading="applyDiscountLoading"
          class="apply-btn"
          @click="applyDiscountHandle"
        >
          Apply
        </div>
      </div>
      <div
        v-loading="removeDiscountLoading"
        v-if="discount.length > 0"
        style="
          width: 100px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #bdbdbd;
          margin-top: 10px;
        "
        @click="removeDiscountHandle"
      >
        <div>{{ discount }}</div>
        <img
          src="../assets/icons/cross.png"
          style="height: 16px; margin-left: 10px"
        />
      </div>
    </div>
    <div style="font-weight: bold; line-height: 20px; margin: 24px 0 16px">
      Order items
    </div>
    <div
      v-for="item in checkout.data.lineItems.edges"
      :key="item.node.id"
      class="order-item"
    >
      <img
        :src="item.node.variant.image.url"
        style="width: 51px; height: 76px; object-fit: contain"
      />
      <div class="order-item-right">
        <div style="font-weight: bold">
          {{ item.node.variant.product.productType }}
        </div>
        <div style="flex: 1">{{ item.node.variant.product.title }}</div>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 12px; line-height: 16px; color: #757575">
            {{ item.node.variant.title }} x{{ item.node.quantity }}
          </div>
          <div>
            {{ item.node.variant.price.currencyCode }}
            {{ item.node.variant.price.amount }}
          </div>
        </div>
      </div>
    </div>
    <div style="font-weight: bold; line-height: 20px; margin-bottom: 16px">
      Summary
    </div>
    <div
      style="
        padding: 12px 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      "
    >
      <div class="summary-item">
        <div>Subtotal</div>
        <div>
          {{ checkout.data.lineItemsSubtotalPrice.currencyCode }}
          {{ checkout.data.lineItemsSubtotalPrice.amount }}
        </div>
      </div>
      <div class="summary-item">
        <div>Shipping</div>
        <div v-if="checkout.data.shippingLine != null">
          {{ checkout.data.shippingLine.priceV2.currencyCode }}
          {{ checkout.data.shippingLine.priceV2.amount }}
        </div>
        <div v-else>CNY 0.0</div>
      </div>
      <div class="summary-item">
        <div>Taxes</div>
        <div>
          {{ checkout.data.totalTaxV2.currencyCode }}
          {{ checkout.data.totalTaxV2.amount }}
        </div>
      </div>
      <div class="summary-item">
        <div>Discount</div>
        <div>
          {{ checkout.data.totalPriceV2.currencyCode }}
          {{
            checkout.data.shippingLine != null
              ? (
                  checkout.data.totalPriceV2.amount -
                  checkout.data.lineItemsSubtotalPrice.amount -
                  checkout.data.shippingLine.priceV2.amount -
                  checkout.data.totalTaxV2.amount
                ).toFixed(1)
              : (
                  checkout.data.totalPriceV2.amount -
                  checkout.data.lineItemsSubtotalPrice.amount -
                  checkout.data.totalTaxV2.amount
                ).toFixed(1)
          }}
        </div>
      </div>
    </div>
    <div class="summary-total">
      <div>Total</div>
      <div>
        {{ checkout.data.totalPriceV2.currencyCode }}
        {{ checkout.data.totalPriceV2.amount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckoutSchemas } from '@/server/graphql/schema/checkout_schema'
import { useMutation } from '@vue/apollo-composable'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const { checkout } = defineProps({
  checkout: {
    type: Object,
  },
})

const emit = defineEmits(['discountHandle'])

const discountInput = ref('')
const discount = ref('')

const {
  mutate: applyDiscount,
  loading: applyDiscountLoading,
  onDone: applyDiscountOnDone,
} = useMutation(CheckoutSchemas.checkoutDiscountCodeApplyV2)

applyDiscountOnDone((result) => {
  if (result.data.checkoutDiscountCodeApplyV2.checkoutUserErrors.length > 0) {
    ElMessage.error('Discount error')
  } else {
    discount.value = discountInput.value
    emit('discountHandle', result.data.checkoutDiscountCodeApplyV2.checkout)
  }
})

const {
  mutate: removeDiscount,
  loading: removeDiscountLoading,
  onDone: removeDiscountOnDone,
} = useMutation(CheckoutSchemas.checkoutDiscountCodeRemove)

removeDiscountOnDone((result) => {
  console.log(result)
  discount.value = ''
  emit('discountHandle', result.data.checkoutDiscountCodeRemove.checkout)
})

function applyDiscountHandle() {
  if (discountInput.value.length > 0) {
    applyDiscount({
      checkoutId: checkout.data.id,
      discountCode: discountInput.value,
    })
  }
}

function removeDiscountHandle() {
  if (discount.value.length > 0) {
    removeDiscount({
      checkoutId: checkout.data.id,
    })
  }
}
</script>

<style scoped>
.input {
  width: 250px;
  margin-right: 8px;
  font-size: 14px;
  --el-input-border-color: #bdbdbd;
  --el-input-border-radius: 2px;
}
.apply-btn {
  width: 71px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #bdbdbd;
  border-radius: 2px;
}
.order-item {
  display: flex;
  border-top: 1px solid #eee;
  padding: 8px 0 12px;
}
.order-item-right {
  margin-left: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 20px;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  height: 20px;
  line-height: 20px;
}
.summary-total {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  height: 20px;
  line-height: 22px;
}
</style>
