import { ref, reactive, toRaw, toRefs } from 'vue'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', () => {
  const currentCountry = reactive({})
  const showRegion = ref(false)

  let localCountry = localStorage.getItem('KPublicCountry')
  if (localCountry == null) {
    Object.assign(currentCountry, {
      name: 'China',
      code: 'CN',
      currencyCode: 'USD',
    })
  } else {
    Object.assign(currentCountry, JSON.parse(localCountry))
  }

  function setCountry(country) {
    Object.assign(currentCountry, {
      name: country.name,
      code: country.code,
      currencyCode: country.currencyCode,
    })
    localStorage.setItem(
      'KPublicCountry',
      JSON.stringify(toRaw(currentCountry))
    )
  }

  function setShowRegion(show) {
    showRegion.value = show
  }

  return { ...toRefs(currentCountry), setCountry, showRegion, setShowRegion }
})
