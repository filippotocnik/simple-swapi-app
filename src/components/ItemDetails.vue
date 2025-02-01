<script setup lang="ts">
import type { Category } from '@/stores/category'
import { ref } from 'vue'

const props = defineProps<{
  item: Category
}>()

const showDetails = ref(false)
</script>

<template>
  <div @click="showDetails = !showDetails">
    {{ props.item.name }}

    <div v-show="showDetails">details</div>
  </div>
</template>
