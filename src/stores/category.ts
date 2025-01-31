import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  interface CategoryRes {
    count: number
    next: string
    previous: string
    results: Category[]
  }
  interface Category {
    name: string
  }

  const url = 'https://swapi.dev/api/'
  const selectedCategoryRes: Ref<CategoryRes | null> = ref(null)
  const loading = ref(false)

  const selectedCategoryItems = computed(() => {
    return selectedCategoryRes.value?.results || []
  })

  const isNextDisabled = computed(() => selectedCategoryRes.value?.next === null)
  const isPrevDisabled = computed(() => selectedCategoryRes.value?.previous === null)

  const getCategoryItems = (categoryName: string) => {
    loading.value = true
    fetch(`${url}${categoryName}`)
      .then((res) => res.json())
      .then((data: CategoryRes) => {
        selectedCategoryRes.value = data
        loading.value = false
      })
  }

  const showMore = () => {
    fetch(selectedCategoryRes.value?.next || '')
      .then((res) => res.json())
      .then((data: CategoryRes) => {
        selectedCategoryRes.value = data
        loading.value = false
      })
  }

  const showLess = () => {
    fetch(selectedCategoryRes.value?.previous || '')
      .then((res) => res.json())
      .then((data: CategoryRes) => {
        selectedCategoryRes.value = data
        loading.value = false
      })
  }

  return {
    getCategoryItems,
    loading,
    selectedCategoryItems,
    showMore,
    showLess,
    isNextDisabled,
    isPrevDisabled,
  }
})
