<template>
  <div class="bgc">
    <div style="width: 380px">
      <div style="font-size: 20px; line-height: 24px; margin-bottom: 20px">
        Welcome to Shopify
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        label-position="top"
        scroll-to-error
        hide-required-asterisk
      >
        <el-form-item label="First name" prop="firstName">
          <el-input
            v-model="form.firstName"
            style="height: 40px"
            placeholder="First Name"
          />
        </el-form-item>
        <el-form-item label="Last name" prop="lastName">
          <el-input
            v-model="form.lastName"
            style="height: 40px"
            placeholder="Last Name"
          />
        </el-form-item>
        <el-form-item label="Email address" prop="email">
          <el-input
            v-model="form.email"
            style="height: 40px"
            placeholder="Email address"
          />
        </el-form-item>
        <el-form-item label="Password" prop="pwd">
          <el-input
            v-model="form.pwd"
            style="height: 40px"
            type="password"
            placeholder="Password"
          />
        </el-form-item>
        <div style="font-size: 12px; line-height: 16px">
          Your password must be between 7 to 20 characters, containing at least
          1 letter and 1 number
        </div>
        <div style="margin-top: 24px; display: flex">
          <el-checkbox
            v-model="checked"
            label=""
            value="Value 1"
            style="width: 26px; height: 18px"
          />
          <div style="line-height: 20px">
            Sign up to stay up-to-date with the latest new season fashion as
            well as sales and promotions
          </div>
        </div>
        <div v-loading="registerLoading" @click="onSubmit" class="sign-btn">
          Register
        </div>
      </el-form>
      <div style="margin-top: 24px; font-size: 12px; line-height: 16px">
        <span
          >By registering, you agree to the Shopify
          <span style="color: #757575">Terms and Conditions</span> and
          <span style="color: #757575">Privacy Policy</span></span
        >
      </div>
      <div style="margin-top: 24px; margin-bottom: 50px; line-height: 20px">
        <span
          >Already have an account?
          <span
            @click="goToLogin"
            style="color: #757575; text-decoration: underline"
            >Sign in</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { LoginSchema } from '@/server/graphql/schema/login_schema'

const router = useRouter()
const ruleFormRef = ref(null)
const checked = ref(true)

const form = reactive({
  email: '',
  pwd: '',
  firstName: '',
  lastName: '',
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
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: 'blur',
    },
  ],
  pwd: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
  ],
})

const {
  mutate: register,
  loading: registerLoading,
  onDone: registerOnDone,
} = useMutation(LoginSchema.customerCreate)

registerOnDone((result) => {
  if (result.data.customerCreate.customer != null) {
    // eslint-disable-next-line no-undef
    ElMessage.success('Registered successfully')
    setTimeout(() => {
      router.push({
        path: 'login',
      })
    }, 2800)
  }
})

const onSubmit = async () => {
  console.log(form)
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('no error!')
      register({
        input: {
          email: 'tom6@163.com',
          password: '123321',
          firstName: 'Tom',
          lastName: 'Li',
          acceptsMarketing: true,
        },
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

function goToLogin() {
  router.push({
    path: 'login',
  })
}
</script>

<style scoped>
.bgc {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sign-btn {
  height: 40px;
  width: 100%;
  margin-top: 24px;
  background-color: #212121;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}
</style>
