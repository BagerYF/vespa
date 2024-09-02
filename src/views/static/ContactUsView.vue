<template>
  <div class="bgc">
    <div style="width: 700px; margin-bottom: 80px">
      <div style="font-size: 30px; margin: 22px 0">Help and Contact</div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="item in textList"
          :title="item.title"
          :name="item.title"
          :key="item.title"
          style="--el-collapse-header-font-size: 16px"
        >
          <div>
            {{ item.text }}
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Email customer service"
          name="item.title"
          key="Email customer service"
          style="--el-collapse-header-font-size: 16px"
        >
          <div style="line-height: 20px; margin-top: 16px">
            To submit an inquiry, simply complete the contact form below and
            click ‘Send’. We aim to get back to you in one business day.
          </div>
          <div
            style="
              line-height: 20px;
              margin-top: 20px;
              margin-bottom: 20px;
              color: #201313;
            "
          >
            Currently, we are receiving a high volume of inquiries and will
            require more time than usual to respond. We apologise for the
            inconvenience.
          </div>

          <el-form
            ref="ruleFormRef"
            :model="form"
            :rules="rules"
            label-width="auto"
            style="max-width: 700px"
            label-position="top"
            scroll-to-error
            hide-required-asterisk
          >
            <el-form-item label="Name*" prop="name">
              <el-input
                v-model="form.name"
                style="height: 40px"
                placeholder="Name"
              />
            </el-form-item>
            <el-form-item label="Email*" prop="email">
              <el-input
                v-model="form.email"
                style="height: 40px"
                placeholder="Email address"
              />
            </el-form-item>
            <el-form-item label="Phone*" prop="phone">
              <el-input
                v-model="form.phone"
                style="height: 40px"
                placeholder="Phone number"
              />
            </el-form-item>
            <el-form-item
              label="Is this enquiry related to an existing order?*"
              prop="order"
            >
              <el-radio-group v-model="form.order">
                <div style="display: flex; flex-direction: column">
                  <el-radio value="yes">Yes</el-radio>
                  <el-radio value="no">No</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-show="form.order == 'yes'"
              label="Order number*"
              prop="orderNum"
            >
              <el-input
                v-model="form.orderNum"
                style="height: 40px"
                placeholder="Order number"
              />
            </el-form-item>
            <el-form-item label="Inquiry type*" prop="type">
              <el-select v-model="form.type" placeholder="Inquiry type">
                <el-option
                  v-for="item in typeList"
                  :label="item"
                  :value="item"
                  :key="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Message" prop="message">
              <el-input
                v-model="form.message"
                type="textarea"
                placeholder="Type your message here"
                :autosize="{ minRows: 5 }"
              />
            </el-form-item>
            <el-form-item>
              <div
                @click="onSubmit"
                style="
                  height: 40px;
                  width: 100%;
                  margin-top: 32px;
                  margin-bottom: 40px;
                  background-color: #212121;
                  color: #fff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 16px;
                  font-weight: bold;
                "
              >
                Send
              </div>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div style="display: flex; padding: 40px 0">
        <div style="margin-right: 10px; flex: 1">
          <img src="../../assets/icons/questions.png" style="width: 24px" />
          <div
            style="
              font-size: 16px;
              line-height: 22px;
              margin-top: 8px;
              font-weight: bold;
            "
          >
            FAQs
          </div>
          <div
            style="
              font-size: 16px;
              line-height: 22px;
              margin-top: 8px;
              color: #505050;
            "
          >
            Find answers to common questions related to payment, orders and more
          </div>
          <div style="line-height: 20px; margin-top: 8px; color: #757575">
            See our FAQs
          </div>
        </div>
        <div style="margin-right: 10px; flex: 1">
          <img src="../../assets/icons/package.png" style="width: 24px" />
          <div
            style="
              font-size: 16px;
              line-height: 22px;
              margin-top: 8px;
              font-weight: bold;
            "
          >
            Orders and shipping
          </div>
          <div
            style="
              font-size: 16px;
              line-height: 22px;
              margin-top: 8px;
              color: #505050;
            "
          >
            See more about delivery, returns and cancellations
          </div>
          <div style="line-height: 20px; margin-top: 8px; color: #757575">
            Orders and Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const textList = [
  {
    title: 'I want to cancel my order',
    text: `We understand that sometimes customers may need to cancel their order. Please note, if your order has been prepared for shipment, cancellation requests cannot be accepted. If your order has not been prepared for shipment, you can cancel your order as follows:
Login to your account.
Go to the My Orders page by clicking on the account button and selecting "My Orders".
Find the order you want to cancel and click to see the order details.
Click the "Cancel item(s)" button below your order items and follow the prompts to cancel your order.
See our cancellation policy for more information.`,
  },
  {
    title: 'I want to return an item',
    text: `Once you receive your item, you can initiate a return as follows:
Login to your account.
Go to the My Orders page by clicking on the account button and selecting "My Orders".
Find the order you want to return and click to see the order details.
Click the "Return item(s)" button below your order items and follow the prompts to schedule your return.
For more information on eligibility and conditions see our return policy.
`,
  },
]

import { ref, reactive, watch } from 'vue'

const activeName = ref([''])

const ruleFormRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  type: '',
  orderNum: '',
  order: 'no',
  message: '',
})

const rules = reactive({
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: 'submit',
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Please input phone number',
      trigger: 'blur',
    },
  ],
  order: [
    {
      required: true,
      message: 'Please select yes or no',
      trigger: 'blur',
    },
  ],
  orderNum: [
    {
      required: false,
      message: 'Please input order number',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select inquiry type',
      trigger: 'blur',
    },
  ],
  message: [
    {
      required: true,
      message: 'Please input your message',
      trigger: 'blur',
    },
  ],
})

const typeList = [
  'Trouble placing an order',
  'Product information',
  'Status of my order',
  'Delivery tracking',
  'Product I received',
  'Returns',
  'Refunds',
  'Change my address',
]

watch(
  () => form.order,
  (value) => {
    console.log(value)
    if (value == 'yes') {
      rules.orderNum[0].required = true
    } else {
      rules.orderNum[0].required = false
    }
  }
)

const onSubmit = async () => {
  console.log(form)
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('no error!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.bgc {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
