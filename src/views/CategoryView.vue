<script setup lang="ts">
import { ref, toRefs, watch, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useCategoryStore } from '../stores/category'
import { type ICategoryItem } from '@/models/category.interfaces'
import { storeToRefs } from 'pinia'
import ItemDetails from '@/components/ItemDetails.vue'
import Loading from '@/components/Loading.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
import { useFilters } from '@/use/filters'
import { type ISelectedFilters } from '@/models/category.interfaces'

const route = useRoute()

const store = useCategoryStore()
const { loading, selectedCategoryItems, isNextDisabled, isPrevDisabled, filters } =
  storeToRefs(store)
const { getCategoryItems, showLess, showMore } = store

const categoryItems = ref([] as ICategoryItem[])

const setFilters = () => {
  return filters.value.reduce((acc: ISelectedFilters, filter) => {
    acc[filter.key] = []
    return acc
  }, {} as ISelectedFilters)
}

const selectedFilters = ref<ISelectedFilters>({})

const { filteredCollection } = toRefs(useFilters(categoryItems, selectedFilters))

watch(filters, () => {
  selectedFilters.value = setFilters()
})

watchEffect(() => {
  getCategoryItems(route.params.categoryName as string)
})

watchEffect(() => {
  categoryItems.value = selectedCategoryItems.value.map((item) => ({
    ...item,
    type: route.params.categoryName as string,
  }))
})
</script>

<template>
  <header>
    <RouterLink to="/">
      <div>
        <back-arrow-icon />
      </div>
    </RouterLink>
    <h1 class="title">{{ route.params.categoryName }}</h1>
    <div>&nbsp;</div>
  </header>

  <template v-if="loading">
    <loading />
  </template>
  <template v-else>
    <div class="flex">
      <div class="">
        <div class="mb-4">Filters:</div>
        <div v-for="filter in filters" class="mb-4">
          <div class="text-md">
            {{ filter.label }}
          </div>
          <div v-for="item in filter.values" class="mb-2">
            <label :for="`${item}`">
              <input
                class="mr-2"
                type="checkbox"
                :id="`${item}`"
                :value="item"
                v-model="selectedFilters[filter.key]"
              />{{ item }}</label
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center ml-6">
        <div v-for="(item, index) in filteredCollection" class="min-w-xl">
          <item-details :item="item" :index="index" />
        </div>
        <div class="flex justify-between w-1/2 mt-5">
          <button
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 disabled:pointer-events-none"
            :disabled="isPrevDisabled"
            @click="showLess"
          >
            Prev page
          </button>
          <button
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 disabled:pointer-events-none"
            :disabled="isNextDisabled"
            @click="showMore"
          >
            Next page
          </button>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
@reference "tailwindcss";

header {
  @apply flex items-center justify-between mb-4;
}

header * {
  @apply flex-1;
}

.title {
  @apply text-center text-4xl capitalize;
}
</style>
