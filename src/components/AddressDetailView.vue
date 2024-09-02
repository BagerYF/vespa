<template>
  <div>
    <el-dialog
      v-model="accountStore.showAddressDetail"
      title=""
      width="500px"
      :show-close="false"
      style="padding: 0; margin-top: 100px"
    >
      <div
        v-loading="
          accountStore.addAddressLoading || accountStore.updateAddressLoading
        "
        style="width: 500px; padding-bottom: 1px"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 52px;
            margin: 0 24px;
          "
        >
          <div style="font-size: 16px">
            {{
              accountStore.tempAddress.data.id != null
                ? 'Edit Address'
                : 'Add Address'
            }}
          </div>
          <img
            src="../assets/icons/cross.png"
            style="width: 16px"
            @click="accountStore.showAddressDetail = false"
          />
        </div>
        <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          label-width="auto"
          style="max-width: 500px"
          label-position="top"
          scroll-to-error
          hide-required-asterisk
        >
          <div style="display: flex">
            <div style="flex: 1; margin: 0 6px 0 24px">
              <el-form-item label="First Name" prop="firstName">
                <el-input
                  v-model="form.firstName"
                  style="height: 40px"
                  placeholder="First Name"
                />
              </el-form-item>
            </div>
            <div style="flex: 1; margin: 0 24px 0 6px">
              <el-form-item label="Last Name" prop="lastName">
                <el-input
                  v-model="form.lastName"
                  style="height: 40px"
                  placeholder="Last Name"
                />
              </el-form-item>
            </div>
          </div>
          <div style="margin: 0 24px">
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
          <div style="margin: 0 24px">
            <el-form-item label="Address" prop="address1">
              <el-input
                v-model="form.address1"
                style="height: 40px"
                placeholder="Address"
              />
            </el-form-item>
          </div>
          <div style="margin: 0 24px">
            <el-form-item label="Apartment, suite, unit, etc" prop="address2">
              <el-input
                v-model="form.address2"
                style="height: 40px"
                placeholder="Apartment, suite, unit, etc"
              />
            </el-form-item>
          </div>
          <div style="margin: 0 24px">
            <el-form-item label="City" prop="city">
              <el-input
                v-model="form.city"
                style="height: 40px"
                placeholder="City"
              />
            </el-form-item>
          </div>
          <div style="display: flex; padding-left: 24px">
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
            <div style="flex: 1; margin: 0 24px 0 0px">
              <el-form-item label="Postcode/Zipcode" prop="zip">
                <el-input
                  v-model="form.zip"
                  style="height: 40px"
                  placeholder="Postcode/Zipcode"
                />
              </el-form-item>
            </div>
          </div>
          <div style="margin: 0 24px">
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
              justify-content: end;
              align-items: center;
              margin: 32px 24px;
            "
          >
            <div
              style="margin-right: 24px; color: #757575"
              @click="accountStore.showAddressDetail = false"
            >
              Cancel
            </div>
            <div
              @click="onSubmit"
              style="
                height: 40px;
                width: 120px;
                background-color: #212121;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              {{
                accountStore.tempAddress.data.id != null
                  ? 'Edit Address'
                  : 'Add Address'
              }}
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { kCountryMaps } from '@/data/region'
import { ref, watch, reactive } from 'vue'
import { useAccountStore } from '../stores/account'

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

watch(
  () => accountStore.tempAddress.data,
  (e) => {
    form.firstName = e.firstName
    form.lastName = e.lastName
    form.address1 = e.address1
    form.address2 = e.address2
    form.city = e.city
    form.zip = e.zip
    form.phone = e.phone
    form.country = {}
    form.province = {}
    if (e.id != null) {
      form.country = country.data.filter((s) => s.code == e.countryCodeV2)[0]
      if (e.provinceCode != null && e.provinceCode.length > 0) {
        form.province = form.country.provinces.filter(
          (s) => s.code == e.provinceCode
        )[0]
      }
    } else {
      form.country = country.data.filter((e) => e.code == 'CN')[0]
      province.data = form.country.provinces
      if (province.data.length > 0) {
        form.province = province.data[0]
      }
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
      let params = {
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
      accountStore.addressHandle(params)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped></style>
