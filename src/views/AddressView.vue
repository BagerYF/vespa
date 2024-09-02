<template>
  <div v-loading="accountStore.addressLoading" class="bgc">
    <div v-if="accountStore.customer.data.id != null" class="bgw">
      <div
        style="
          font-size: 18px;
          line-height: 26px;
          font-weight: bold;
          margin-bottom: 32px;
        "
      >
        Address Book
      </div>
      <div
        v-if="accountStore.customer.data.addresses.edges.length == 0"
        style="line-height: 20px"
      >
        You do not have any saved addresses
      </div>
      <div style="line-height: 20px; font-weight: bold; margin-bottom: 12px">
        Your Saved Addresses
      </div>
      <div
        v-for="item in accountStore.customer.data.addresses.edges"
        :key="item.node.id"
        style="
          border-top: 1px solid #eee;
          display: flex;
          align-items: end;
          padding: 12px 0;
        "
      >
        <div style="flex: 1">
          <div style="line-height: 20px; font-weight: bold">
            {{ item.node.name }}
          </div>
          <div style="line-height: 20px">
            {{ item.node.address1 }}
            {{ item.node.address2 }}
            <br />
            {{ item.node.city }}
            {{ item.node.province }}
            {{ item.node.country }}
            {{ item.node.zip }}
            <br />
            {{ item.node.phone }}
          </div>
        </div>
        <div style="display: flex; line-height: 20px; color: #757575">
          <div @click="updateAddress(item)" style="margin-right: 24px">
            Edit
          </div>
          <div @click="accountStore.removeAddressHandle(item.node.id)">
            Remove
          </div>
        </div>
      </div>

      <div class="add-btn" @click="addAddress">
        <img src="../assets/icons/plus.png" style="width: 14px; height: 14px" />
        <div>Add address</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '../stores/account'

const accountStore = useAccountStore()

function addAddress() {
  accountStore.showAddressDetail = true
  accountStore.tempAddress.data = {}
}

function updateAddress(item) {
  accountStore.showAddressDetail = true
  accountStore.tempAddress.data = item.node
}
</script>

<style scoped>
.bgc {
  display: flex;
  justify-content: center;
}
.bgw {
  width: 100%;
  max-width: 700px;
  min-height: 400px;
}
.add-btn {
  width: 120px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #bdbdbd;
  margin-top: 24px;
  margin-bottom: 100px;
}
</style>
