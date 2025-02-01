<script setup lang="ts">
const categories: Record<string, string>[] = [
  {
    key: 'people',
    label: 'Characters',
    description: 'Characters in the Star Wars Universe',
  },
  {
    key: 'planets',
    label: 'Planets',
    description: 'A large mass, planet or planetoid in the Star Wars Universe',
  },
  {
    key: 'starships',
    label: 'Starships',
    description: 'A single transport craft that has hyperdrive capability',
  },
]
</script>

<template>
  <div class="flex flex-col items-center">
    <RouterLink
      class="min-w-sm"
      v-for="category in categories"
      :to="`/${category.key}`"
      :key="category.key"
    >
      <div class="max-w-sm rounded shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ category.label }}</div>
          <p class="text-gray-700 text-base">
            {{ category.description }}
          </p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
