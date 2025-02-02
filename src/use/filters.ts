import { type ICategoryItem, type ISelectedFilters } from '@/models/category.interfaces'
import { computed, ref, watch, type Ref } from 'vue'

export const useFilters = (
  collection: Ref<ICategoryItem[]>,
  selectedFilters: Ref<ISelectedFilters>,
) => {
  const filteredCollection = ref([] as ICategoryItem[])
  const filtersUsed = computed(() => {
    return Object.values(selectedFilters.value).some((filters) => filters.length > 0)
  })

  watch(
    selectedFilters,
    () => {
      if (filtersUsed.value) {
        filteredCollection.value = collection.value.filter((item) => {
          return Object.entries(selectedFilters.value).some(([key, values]) =>
            values.includes((item as Record<string, any>)[key]),
          )
        })
      } else {
        filteredCollection.value = collection.value
      }
    },
    { deep: true },
  )
  return {
    filteredCollection,
  }
}
