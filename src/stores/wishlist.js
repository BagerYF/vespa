import { reactive, toRaw } from 'vue'
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = reactive({ data: [] })

  getWishlist()

  function getWishlist() {
    let localWishlist = localStorage.getItem('KPublicWishlist')
    if (localWishlist != null) {
      wishlist.data = JSON.parse(localWishlist)
    }
  }

  function addWishlist(item) {
    getWishlist()
    wishlist.data = [item, ...wishlist.data]
    localStorage.setItem(
      'KPublicWishlist',
      JSON.stringify(toRaw(wishlist).data)
    )
  }

  function removeWishlist(item) {
    getWishlist()
    wishlist.data = wishlist.data.filter((e) => e.id != item.id)
    localStorage.setItem(
      'KPublicWishlist',
      JSON.stringify(toRaw(wishlist).data)
    )
  }

  return { wishlist, addWishlist, removeWishlist }
})
