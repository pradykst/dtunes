<template>
  <div>
    <!-- Markup shared across all pages, ex: NavBar -->

      <NuxtPage />

    <UNotifications />

  </div>


</template>


<script setup lang="ts">
useSeoMeta({
  ogImage: '/logo.png'
})
</script>
