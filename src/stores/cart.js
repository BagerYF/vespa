import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useMutation } from '@vue/apollo-composable'
import { CartSchema } from '@/server/graphql/schema/cart_schema'

export const useCartStore = defineStore('cart', () => {
  const cart = reactive({ data: {} })
  const addProductToCartLoading = ref(false)
  const updateProductLoading = ref(false)

  initCart()

  function initCart() {
    let localCart = localStorage.getItem('KPublicCart')
    if (localCart != null) {
      cart.data = JSON.parse(localCart)
    }
  }

  const {
    mutate: createCart,
    loading: createCartLoading,
    onDone: createCartOnDone,
  } = useMutation(CartSchema.createCart)

  createCartOnDone((result) => {
    setCart(result.data.cartCreate.cart)
  })

  const {
    mutate: addProductToCart,
    loading: addProductsToCartLoading,
    onDone: addProductToCartOnDone,
  } = useMutation(CartSchema.addProductsToCart)

  addProductToCartOnDone((result) => {
    setCart(result.data.cartLinesAdd.cart)
  })

  watch([addProductsToCartLoading, createCartLoading], (e) => {
    addProductToCartLoading.value = e[0] || e[1]
  })

  function addProductsToCart(variantId) {
    if (cart.data.id != null) {
      addProductToCart({
        cartId: cart.data.id,
        lines: [
          {
            quantity: 1,
            merchandiseId: variantId,
          },
        ],
      })
    } else {
      createCart({
        input: {
          lines: [
            {
              quantity: 1,
              merchandiseId: variantId,
            },
          ],
        },
      })
    }
  }

  const {
    mutate: updateProductQuantity,
    loading: updateProductQuantityLoading,
    onDone: updateProductQuantityOnDone,
  } = useMutation(CartSchema.updateProductQuantityInCart)

  function updateProductQuantityInCart(cartItemId, qty) {
    updateProductQuantity({
      cartId: cart.data.id,
      lines: [
        {
          quantity: qty,
          id: cartItemId,
        },
      ],
    })
  }

  updateProductQuantityOnDone((result) => {
    setCart(result.data.cartLinesUpdate.cart)
  })

  const {
    mutate: removeProduct,
    loading: removeProductLoading,
    onDone: removeProductOnDone,
  } = useMutation(CartSchema.removeProductFromCart)

  function removeProductFromCart(cartItemId) {
    removeProduct({
      cartId: cart.data.id,
      lineIds: [cartItemId],
    })
  }

  removeProductOnDone((result) => {
    setCart(result.data.cartLinesRemove.cart)
  })

  watch([updateProductQuantityLoading, removeProductLoading], (e) => {
    updateProductLoading.value = e[0] || e[1]
  })

  function setCart(tempCart) {
    if (tempCart.lines.edges.length > 0) {
      cart.data = tempCart
      localStorage.setItem('KPublicCart', JSON.stringify(tempCart))
    } else {
      cart.data = {}
      localStorage.removeItem('KPublicCart')
    }
  }

  return {
    cart,
    addProductsToCart,
    addProductToCartLoading,
    updateProductQuantityInCart,
    removeProductFromCart,
    updateProductLoading,
  }
})
