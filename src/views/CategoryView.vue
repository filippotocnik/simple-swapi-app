<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useCategoryStore } from '../stores/category'
import { type Category } from '@/models/category.interfaces'
import { storeToRefs } from 'pinia'
import ItemDetails from '@/components/ItemDetails.vue'
import Loading from '@/components/Loading.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'

const route = useRoute()

const store = useCategoryStore()
const { loading, selectedCategoryItems, isNextDisabled, isPrevDisabled } = storeToRefs(store)
const { getCategoryItems, showLess, showMore } = store

const categoryItems = ref([] as Category[])

watchEffect(() => {
  getCategoryItems(route.params.categoryName as string)
})

watchEffect(() => {
  categoryItems.value = selectedCategoryItems.value.map((item) => ({
    ...item,
    hasOpenDetails: false,
    type: route.params.categoryName as string,
  }))
})

const toggleItemDetails = (index: number) => {
  categoryItems.value = categoryItems.value.map((item, i) => {
    return {
      ...item,
      hasOpenDetails: i === index ? !item.hasOpenDetails : false,
    }
  })
}
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
    <div class="flex flex-col items-center">
      <div v-for="(item, index) in categoryItems" class="min-w-xl">
        <item-details :item="item" :index="index" @toggleDetails="toggleItemDetails" />
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
