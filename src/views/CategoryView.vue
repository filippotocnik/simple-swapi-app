<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '../stores/category'
import { storeToRefs } from 'pinia'
import ItemDetails from '@/components/ItemDetails.vue'

const route = useRoute()

const store = useCategoryStore()
const { loading, selectedCategoryItems, isNextDisabled, isPrevDisabled } = storeToRefs(store)
const { getCategoryItems, showLess, showMore } = store

watchEffect(() => {
  getCategoryItems(route.params.categoryName as string)
})
</script>

<template>
  <template v-if="loading"> loading... </template>
  <template v-else>
    <div>type: {{ route.params.categoryName }}</div>

    <div v-for="item in selectedCategoryItems">
      <item-details :item="item" />
    </div>

    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        :disabled="isPrevDisabled"
        @click="showLess"
      >
        Prev page
      </button>
      <button :disabled="isNextDisabled" @click="showMore">Next page</button>
    </div>
  </template>
</template>
