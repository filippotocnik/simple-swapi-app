<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { type Category } from '@/models/category.interfaces'
import { computed } from 'vue'

const props = defineProps<{
  item: Category
  index: number
}>()

const emit = defineEmits<{
  toggleDetails: [index: number]
}>()

const { detailsMapper } = useCategoryStore()

const itemDetails = computed(() => {
  return detailsMapper[props.item.type].map((itemDetails) => ({
    label: itemDetails.label,
    value: props.item[itemDetails.key as keyof Category],
  }))
})
</script>

<template>
  <div class="border-b border-slate-200">
    <button
      @click="emit('toggleDetails', index)"
      class="w-full flex justify-between items-center py-5 text-slate-800"
    >
      <span class="font-bold">{{ props.item.name }}</span>
      <span class="text-slate-800">
        <template v-if="props.item.hasOpenDetails">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
            />
          </svg>
        </template>
      </span>
    </button>
    <div v-if="props.item.hasOpenDetails">
      <div v-for="item in itemDetails" class="pb-5 text-sm">
        <span class="text-slate-800 pr-2">{{ item.label }}:</span>
        <span class="text-slate-500">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
