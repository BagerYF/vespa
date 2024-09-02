import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { LoginSchema } from '@/server/graphql/schema/login_schema'
import { AddressSchema } from '@/server/graphql/schema/address_schema'

export const useAccountStore = defineStore('account', () => {
  const customer = reactive({ data: {} })
  const loginInfo = reactive({})
  const showAddressDetail = ref(false)
  const addressLoading = ref(false)
  const tempAddress = reactive({ data: {} })

  const initCustomer = () => {
    let localToken = localStorage.getItem('KPublicToken')
    if (localToken != null) {
      console.log(localToken)
      loginInfo.customerAccessToken = localToken
    }
  }

  initCustomer()

  const {
    result,
    loading: queryCustomerLoading,
    refetch,
  } = useQuery(LoginSchema.customer, loginInfo, {
    fetchPolicy: 'no-cache',
  })

  watch([result], (e) => {
    customer.data = e[0].customer
  })

  function setCustomer(data) {
    customer.data = data
  }

  const {
    mutate: addAddress,
    loading: addAddressLoading,
    onDone: addAddressOnDone,
  } = useMutation(AddressSchema.customerAddressCreate)

  addAddressOnDone((result) => {
    console.log(result)
    showAddressDetail.value = false
    refetch()
  })

  const {
    mutate: updateAddress,
    loading: updateAddressLoading,
    onDone: updateAddressOnDone,
  } = useMutation(AddressSchema.customerAddressUpdate)

  updateAddressOnDone((result) => {
    console.log(result)
    showAddressDetail.value = false
    refetch()
  })

  function addressHandle(address) {
    if (tempAddress.data.id != null) {
      updateAddress({
        customerAccessToken: localStorage.getItem('KPublicToken'),
        id: tempAddress.data.id,
        address: address,
      })
    } else {
      addAddress({
        customerAccessToken: localStorage.getItem('KPublicToken'),
        address: address,
      })
    }
  }

  const {
    mutate: removeAddress,
    loading: removeAddressLoading,
    onDone: removeAddressOnDone,
  } = useMutation(AddressSchema.customerAddressDelete)

  removeAddressOnDone((result) => {
    console.log(result)
    refetch()
  })

  function removeAddressHandle(id) {
    removeAddress({
      customerAccessToken: localStorage.getItem('KPublicToken'),
      id: id,
    })
  }

  watch([queryCustomerLoading, removeAddressLoading], (e) => {
    addressLoading.value = e[0] || e[1]
  })

  return {
    customer,
    setCustomer,
    showAddressDetail,
    addressHandle,
    addAddressLoading,
    addressLoading,
    removeAddressHandle,
    tempAddress,
    updateAddressLoading,
  }
})
