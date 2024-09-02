<template>
  <div class="bgc">
    <div style="width: 380px">
      <div style="font-size: 20px; line-height: 24px; margin-bottom: 20px">
        Sign in
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
        <div
          v-loading="loginLoading || customerLoading"
          @click="onSubmit"
          class="sign-btn"
        >
          Sign in
        </div>
      </el-form>
      <div
        style="
          font-size: 12px;
          line-height: 50px;
          color: #757575;
          text-align: center;
        "
      >
        Or
      </div>
      <div @click="goToRegister" class="regist-btn">Create Account</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '../stores/account'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { LoginSchema } from '@/server/graphql/schema/login_schema'

const accountStore = useAccountStore()

const router = useRouter()
const ruleFormRef = ref(null)

const form = reactive({
  email: '',
  pwd: '',
})

const rules = reactive({
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

const loginInfo = reactive({})

const { result, loading: customerLoading } = useQuery(
  LoginSchema.customer,
  loginInfo,
  {
    fetchPolicy: 'no-cache',
  }
)

watch([result], (e) => {
  accountStore.setCustomer(e[0].customer)
  router.push({
    path: 'account/account-detail',
  })
})

const {
  mutate: login,
  loading: loginLoading,
  onDone: loginOnDone,
} = useMutation(LoginSchema.customerAccessTokenCreate)

loginOnDone((result) => {
  let token =
    result.data.customerAccessTokenCreate.customerAccessToken.accessToken

  localStorage.setItem('KPublicToken', token)

  loginInfo.customerAccessToken = token
})

const onSubmit = async () => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('no error!')
      login({
        input: {
          email: 'bager1@163.com',
          password: '123321',
        },
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

function goToRegister() {
  router.push({
    path: 'register',
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
  margin-top: 30px;
  background-color: #212121;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}
.regist-btn {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 1px solid #c5c5c5;
}
</style>
