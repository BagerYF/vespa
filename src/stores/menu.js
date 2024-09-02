import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const menuIndex = ref(-1)

  const showMenu = ref(true)

  function setMenuIndex(index) {
    if (index > -1) {
      showMenu.value = true
      menuIndex.value = index
    } else {
      showMenu.value = false
      setTimeout(() => {
        if (showMenu.value == false) {
          menuIndex.value = index
        }
      }, 100)
    }
  }

  function setShowMenu(show) {
    showMenu.value = show
  }

  return { menuIndex, setMenuIndex, setShowMenu }
})
