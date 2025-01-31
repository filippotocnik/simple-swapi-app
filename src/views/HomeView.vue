<script setup lang="ts">
const categories: Record<string, string>[] = [
  {
    key: 'people',
    description: 'A person within the Star Wars universe',
  },
  {
    key: 'planets',
    description: 'A large mass, planet or planetoid in the Star Wars Universe',
  },
  {
    key: 'starships',
    description: 'A single transport craft that has hyperdrive capability',
  },
]
</script>

<template>
  <RouterLink v-for="category in categories" :to="`/${category.key}`">
    <div>{{ category.key }}</div>
    <div>{{ category.description }}</div>
  </RouterLink>
</template>
