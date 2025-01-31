<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '../stores/category'
import { storeToRefs } from 'pinia'

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

    <div v-for="item in selectedCategoryItems">{{ item.name }}</div>

    <div>
      <button :disabled="isPrevDisabled" @click="showLess">Prev page</button>
      <button :disabled="isNextDisabled" @click="showMore">Next page</button>
    </div>
  </template>
</template>
