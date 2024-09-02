<template>
  <div>
    <div style="display: flex; align-items: center">
      <div class="bread-title-active">Information</div>
      <img
        src="../assets/icons/arrow-right-grey.png"
        style="height: 11px; margin: 0 14px"
      />
      <div class="bread-title">Shipping</div>
      <img
        src="../assets/icons/arrow-right-grey.png"
        style="height: 11px; margin: 0 14px"
      />
      <div class="bread-title">Payment</div>
    </div>
    <div class="title">Contact Information</div>
    <div style="line-height: 20px">
      {{ accountStore.customer.data.displayName }}
    </div>
    <div style="line-height: 20px">{{ accountStore.customer.data.email }}</div>
    <el-checkbox
      v-model="checked"
      label="Email me with news and offers"
      value="Value 1"
      style="width: 26px; height: 18px; margin-top: 16px"
    />
    <div class="title">Shipping Address</div>
    <div>
      <div
        v-loading="
          accountStore.addAddressLoading || accountStore.updateAddressLoading
        "
        style="width: 500px; padding-bottom: 1px"
      >
        <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          label-width="auto"
          label-position="top"
          scroll-to-error
          hide-required-asterisk
        >
          <div>
            <el-form-item label="Country/Region" prop="country">
              <el-select
                v-model="form.country"
                placeholder=""
                @change="selectCountry"
              >
                <template #label="{ value }">
                  <div style="display: flex; align-items: center">
                    <img
                      :src="getImgUrl(value.code)"
                      style="width: 18px; border-radius: 9px; margin-right: 8px"
                    />
                    <div style="font-size: 14px">{{ value.name }}</div>
                  </div>
                </template>

                <el-option
                  v-for="item in country.data"
                  :label="item.name"
                  :value="item"
                  :key="item.name"
                >
                  <div style="display: flex; align-items: center">
                    <img
                      :src="getImgUrl(item.code)"
                      style="width: 18px; border-radius: 9px; margin-right: 8px"
                    />
                    <div style="font-size: 14px">{{ item.name }}</div>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <div style="flex: 1; margin-right: 6px">
              <el-form-item label="First Name" prop="firstName">
                <el-input
                  v-model="form.firstName"
                  style="height: 40px"
                  placeholder="First Name"
                />
              </el-form-item>
            </div>
            <div style="flex: 1; margin-left: 6px">
              <el-form-item label="Last Name" prop="lastName">
                <el-input
                  v-model="form.lastName"
                  style="height: 40px"
                  placeholder="Last Name"
                />
              </el-form-item>
            </div>
          </div>
          <div>
            <el-form-item label="Address" prop="address1">
              <el-input
                v-model="form.address1"
                style="height: 40px"
                placeholder="Address"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Apartment, suite, unit, etc" prop="address2">
              <el-input
                v-model="form.address2"
                style="height: 40px"
                placeholder="Apartment, suite, unit, etc"
              />
            </el-form-item>
          </div>
          <div style="display: flex">
            <div style="flex: 1; margin-right: 12px">
              <el-form-item label="City" prop="city">
                <el-input
                  v-model="form.city"
                  style="height: 40px"
                  placeholder="City"
                />
              </el-form-item>
            </div>
            <div
              v-if="province.data.length > 0"
              style="flex: 1; margin-right: 12px"
            >
              <el-form-item
                label="State"
                prop="province"
                @change="selectProvince"
              >
                <el-select v-model="form.province" placeholder="">
                  <el-option
                    v-for="item in province.data"
                    :label="item.name"
                    :value="item"
                    :key="item.name"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div style="flex: 1">
              <el-form-item label="Postcode/Zipcode" prop="zip">
                <el-input
                  v-model="form.zip"
                  style="height: 40px"
                  placeholder="Postcode/Zipcode"
                />
              </el-form-item>
            </div>
          </div>
          <div>
            <el-form-item label="Phone Number" prop="phone">
              <el-input
                v-model="form.phone"
                style="height: 40px"
                placeholder="Phone Number"
              />
            </el-form-item>
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
              <div style="margin-left: 6px">Return to cart</div>
            </div>
            <div
              v-loading="
                shippingAddressUpdateLoading || checkoutShippingLinesLoading
              "
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
              Continue to shipping
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { kCountryMaps } from '@/data/region'
import { ref, watch, reactive } from 'vue'
import { useAccountStore } from '../stores/account'
import { useMutation } from '@vue/apollo-composable'
import { CheckoutSchemas } from '@/server/graphql/schema/checkout_schema'

const { checkout } = defineProps({
  checkout: {
    type: Object,
  },
})

const emit = defineEmits(['addressUpdateHandle', 'shippingRateUpdateHandle'])

const checked = ref(true)
const accountStore = useAccountStore()
const ruleFormRef = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  country: {},
  address1: '',
  address2: '',
  city: '',
  province: {},
  zip: '',
  phone: '',
})

const rules = reactive({
  firstName: [
    {
      required: true,
      message: 'Please input first name',
      trigger: 'blur',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Please input last name',
      trigger: 'blur',
    },
  ],
  address1: [
    {
      required: true,
      message: 'Please input address',
      trigger: 'blur',
    },
  ],
  city: [
    {
      required: true,
      message: 'Please input city',
      trigger: 'blur',
    },
  ],
  country: [],
  province: [
    {
      required: false,
      message: 'Please select state',
      trigger: 'blur',
    },
  ],
  zip: [
    {
      required: true,
      message: 'Please input zip',
      trigger: 'blur',
    },
  ],
})

const country = reactive({ data: [] })
const province = reactive({ data: [] })
let tempAddress = {}

function initCountryData() {
  country.data = kCountryMaps
  form.country = country.data.filter((e) => e.code == 'CN')[0]
  province.data = form.country.provinces
  if (province.data.length > 0) {
    form.province = province.data[0]
  }
}

initCountryData()

function selectCountry(v) {
  province.data = v.provinces
  if (province.data.length > 0) {
    form.province = province.data[0]
  } else {
    form.province = {}
  }
}

function selectProvince(v) {
  form.province = v
}

watch(
  () => form.country,
  () => {
    if (province.length > 0) {
      rules.province[0].required = true
    } else {
      rules.province[0].required = false
    }
  }
)

function getImgUrl(code) {
  return `https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/${
    code || ''
  }.png`
}

const onSubmit = async () => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('no error!')
      tempAddress = {
        country: form.country.name,
        province: form.province.name,
        firstName: form.firstName,
        lastName: form.lastName,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        zip: form.zip,
        phone: form.phone,
      }
      shippingAddressUpdate({
        checkoutId: checkout.data.id,
        shippingAddress: tempAddress,
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const {
  mutate: shippingAddressUpdate,
  loading: shippingAddressUpdateLoading,
  onDone: shippingAddressOnDone,
} = useMutation(CheckoutSchemas.checkoutShippingAddressUpdate)

shippingAddressOnDone((result) => {
  emit('addressUpdateHandle', { result, tempAddress })
  checkoutShippingLines({
    id: checkout.data.id,
  })
})

const {
  mutate: checkoutShippingLines,
  loading: checkoutShippingLinesLoading,
  onDone: checkoutShippingLinesOnDone,
} = useMutation(CheckoutSchemas.checkoutShippingLines)

checkoutShippingLinesOnDone((result) => {
  if (result.data.node.availableShippingRates.ready == true) {
    console.log('done')
    emit('shippingRateUpdateHandle', result)
  } else {
    checkoutShippingLines({
      id: checkout.data.id,
    })
  }
})
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
</style>
