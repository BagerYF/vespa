<template>
  <div>
    <div class="tip">
      Mid-Season Sale | Up to 60% off an extensive range of world-class designer
      brands.
      <div style="text-decoration: underline">Shop now</div>
    </div>
    <SearchView ref="searchRef" />
    <el-affix :offset="0">
      <div class="bg">
        <div class="header">
          <div
            @click="countryStore.setShowRegion(true)"
            style="display: flex; align-items: center"
          >
            <img
              src="../assets/icons/globe.png"
              style="height: 14px; margin-right: 8px"
            />
            <div>
              {{ countryStore.currencyCode }}
              $
            </div>
          </div>
          <RouterLink to="/" class="logo"><div>S H O P I F Y</div></RouterLink>

          <RouterLink to="/account"
            ><img
              src="../assets/icons/person.png"
              style="height: 16px; margin: 0 8px"
          /></RouterLink>
          <RouterLink to="/wishlist">
            <img
              src="../assets/icons/wishlist.png"
              style="height: 16px; margin: 0 8px"
            />
          </RouterLink>
          <RouterLink to="/cart">
            <img
              src="../assets/icons/bag.png"
              style="height: 16px; margin: 0 8px"
            />
          </RouterLink>
        </div>
        <div class="menu" @mouseleave="menuStore.setMenuIndex(-1)">
          <div class="category">
            <div
              @mouseenter="menuStore.setMenuIndex(0)"
              :class="{
                'unselect-item':
                  menuStore.menuIndex != -1 && menuStore.menuIndex != 0,
              }"
            >
              Women
            </div>
            <div
              @mouseenter="menuStore.setMenuIndex(1)"
              :class="{
                'unselect-item':
                  menuStore.menuIndex != -1 && menuStore.menuIndex != 1,
              }"
            >
              Men
            </div>
            <div
              @mouseenter="menuStore.setMenuIndex(2)"
              :class="{
                'unselect-item':
                  menuStore.menuIndex != -1 && menuStore.menuIndex != 2,
              }"
            >
              Kids
            </div>
            <div
              @mouseenter="menuStore.setMenuIndex(3)"
              :class="{
                'unselect-item':
                  menuStore.menuIndex != -1 && menuStore.menuIndex != 3,
              }"
            >
              Designers
            </div>
            <div
              style="color: red"
              @mouseenter="menuStore.setMenuIndex(4)"
              :class="{
                'unselect-item':
                  menuStore.menuIndex != -1 && menuStore.menuIndex != 4,
              }"
            >
              Sale
            </div>
          </div>
          <div class="search" @click="searchRef.dialogVisible = true">
            <div>Search</div>
            <img
              src="../assets/icons/search.png"
              style="height: 16px; margin: 0 8px"
            />
          </div>
        </div>
      </div>
      <MenuView />
    </el-affix>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCountryStore } from '../stores/country'
import { useMenuStore } from '../stores/menu'

const countryStore = useCountryStore()
const menuStore = useMenuStore()

const searchRef = ref()
</script>

<style scoped>
.tip {
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgb(203, 0, 0);
  color: #fff;
}
.bg {
  display: flex;
  flex-direction: column;
  padding: 10px 100px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 12px;
}

.logo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #212121;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.category {
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.unselect-item {
  opacity: 0.3;
}
</style>
