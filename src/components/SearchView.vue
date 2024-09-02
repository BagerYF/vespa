<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title=""
      :show-close="false"
      width="100%"
      style="padding: 0; margin-top: 0"
    >
      <div style="padding: 60px 250px; background-color: #fff">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
          "
        >
          <el-input
            v-model="search"
            style="width: 500px; height: 40px"
            placeholder="Search Shopify"
            class="input"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <img src="../assets/icons/search.png" width="14px" />
            </template>
          </el-input>
          <img src="../assets/icons/cross.png" style="width: 20px" />
        </div>
        <div
          style="margin-left: 10px; margin-top: 20px"
          v-if="searchHistory.data.length > 0"
        >
          <div style="font-size: 12px; color: #757575">Recent searches</div>
          <div
            v-for="item in searchHistory.data"
            :key="item"
            style="font-size: 12px; line-height: 16px; margin: 14px 0"
          >
            {{ item }}
          </div>
          <div style="font-size: 12px; color: #757575" @click="clearHistory">
            Clear all
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)
const search = ref('')

const searchHistory = reactive({
  data: [],
})

initSearchHistory()

function initSearchHistory() {
  let showData = []
  let localSearch = localStorage.getItem('kPublicSearchHistory')
  if (localSearch != null) {
    showData = JSON.parse(localSearch)
  }
  searchHistory.data = showData
}

const handleSearch = (e) => {
  let str = e.target.value
  if (str.length > 0) {
    let showData = []
    let localSearch = localStorage.getItem('kPublicSearchHistory')
    if (localSearch != null) {
      showData = JSON.parse(localSearch)
    }
    let index = showData.indexOf(str)
    if (index !== -1) {
      showData.splice(index, 1)
    }
    showData.unshift(str)
    localStorage.setItem('kPublicSearchHistory', JSON.stringify(showData))

    initSearchHistory()
  }
}

const clearHistory = () => {
  localStorage.removeItem('kPublicSearchHistory')

  initSearchHistory()
}

defineExpose({
  dialogVisible,
})
</script>

<style scoped>
.bgw {
  position: absolute;
  margin-top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 11;
}
.input {
  border: none;
  box-shadow: none;
  padding: 1px 0;
  --el-input-placeholder-color: #212121;
  --el-input-border-color: #fff;
  --el-input-focus-border-color: #fff;
  --el-input-hover-border-color: #fff;
}
</style>
