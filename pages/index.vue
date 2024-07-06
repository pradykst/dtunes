<template>
    <h1>Index fad</h1>
    DATA:
    {{data}}
    <NuxtLink to="/sec">second page</NuxtLink>
    <ULink
    to="/sec"
    active-class="text-primary"
    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
  >
    click
  </ULink>
  <UTable :rows="data" />
  </template>
  
<script setup lang="ts">
const { data } = await useFetch('/api/hello')
console.log('data:',data)
// const { data } = await useFetch('https://api.restful-api.dev/objects')


</script>
