import { ref, type Ref, computed } from 'vue'
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
    detailsMapper,
  }
})
