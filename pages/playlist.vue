<script setup lang="ts">
const playlists = ['Liked Songs', 'Disliked Songs', 'Playlist #1', 'Playlist #2', 'Playlist #3']

const selected = ref()
const query = ref('')
</script>

<template>
  <USelectMenu
    v-model="selected"
    v-model:query="query"
    :options="playlists"
    placeholder="Select a playlist"
    searchable
  />
</template>


  
