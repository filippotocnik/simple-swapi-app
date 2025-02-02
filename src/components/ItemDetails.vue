<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { type ICategoryItem } from '@/models/category.interfaces'
import { computed } from 'vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import MinusIcon from '@/components/icons/MinusIcon.vue'

const props = defineProps<{
  item: ICategoryItem
  index: number
}>()

const emit = defineEmits<{
  toggleDetails: [index: number]
}>()

const { detailsMapper } = useCategoryStore()

const itemDetails = computed(() => {
  return detailsMapper[props.item.type].map((itemDetails) => ({
    label: itemDetails.label,
    value: props.item[itemDetails.key as keyof ICategoryItem],
  }))
})
</script>

<template>
  <div class="border-b border-slate-200">
    <button
      @click="emit('toggleDetails', index)"
      class="cursor-pointer w-full flex justify-between items-center py-5 text-slate-800"
    >
      <span class="font-bold">{{ props.item.name }}</span>
      <span class="text-slate-800">
        <template v-if="props.item.hasOpenDetails">
          <minus-icon />
        </template>
        <template v-else>
          <plus-icon />
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
