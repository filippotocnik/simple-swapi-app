import { ref, type Ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { type CategoryRes } from '@/models/category.interfaces'

export const useCategoryStore = defineStore('category', () => {
  const url = 'https://swapi.dev/api/'

  const detailsMapper: Record<string, Record<string, string>[]> = {
    people: [
      {
        key: 'hair_color',
        label: 'Hair Color',
      },
      {
        key: 'birth_year',
        label: 'Birth Year',
      },
      {
        key: 'eye_color',
        label: 'Eye Color',
      },
    ],
    planets: [
      {
        key: 'diameter',
        label: 'Diameter',
      },
      {
        key: 'climate',
        label: 'Climate',
      },
      {
        key: 'terrain',
        label: 'Terrain',
      },
    ],
    starships: [
      {
        key: 'manufacturer',
        label: 'Manufacturer',
      },
      {
        key: 'max_atmosphering_speed',
        label: 'Max Atmosphering Speed',
      },
      {
        key: 'hyperdrive_rating',
        label: 'Hyperdrive Rating',
      },
    ],
  }

  const selectedCategory = ref('')

  const loading = ref(false)
  const selectedCategoryRes: Ref<CategoryRes | null> = ref(null)

  const selectedCategoryItems = computed(() => {
    return selectedCategoryRes.value?.results || []
  })

  const openDetailsItemName = ref<string | null>(null)

  function setOpenDetailsItemName(name: string | null) {
    openDetailsItemName.value = name
  }

  const selectedCategoryDetails = computed(() => {
    return detailsMapper[selectedCategory.value] || []
  })

  const filters = computed(() => {
    return selectedCategoryDetails.value.map(({ key, label }) => {
      return {
        label,
        key,
        values: selectedCategoryItems.value
          .map((item) => item[key as keyof typeof item])
          .filter((item, index, arr) => arr?.indexOf(item) === index),
      }
    })
  })

  const isNextDisabled = computed(() => selectedCategoryRes.value?.next === null)
  const isPrevDisabled = computed(() => selectedCategoryRes.value?.previous === null)

  function getCategoryItems(categoryName: string) {
    loading.value = true
    selectedCategory.value = categoryName
    fetch(`${url}${categoryName}`)
      .then((res) => res.json())
      .then((data: CategoryRes) => {
        selectedCategoryRes.value = data
        loading.value = false
      })
  }

  function showMore() {
    fetch(selectedCategoryRes.value?.next || '')
      .then((res) => res.json())
      .then((data: CategoryRes) => {
        setOpenDetailsItemName(null)
        selectedCategoryRes.value = data
        loading.value = false
      })
  }

  function showLess() {
    fetch(selectedCategoryRes.value?.previous || '')
      .then((res) => res.json())
      .then((data: CategoryRes) => {
        setOpenDetailsItemName(null)
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
    detailsMapper,
    filters,
    openDetailsItemName,
    setOpenDetailsItemName,
  }
})
