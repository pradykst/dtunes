<template>
  <!-- <h1>Index fad</h1> -->
  <audio id="audio" src="" controls></audio>  
  <UInput v-model="q" name="q" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid" autocomplete="off"
    :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton v-show="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="q = ''" />
    </template>
  </UInput>
  <UButton block  @click="search":ui="{ rounded: 'rounded-full' }">Search</UButton>
  <UButton to="/login">Login</UButton>
<!-- {{ searchResult }} -->
  <UTable :columns="columns" :rows=searchResult @select="select"/>
</template>

<script setup lang="ts">
const columns = [{
  key: 'title',
  label: 'Title'
}, {
  key: 'artist.name',
  label: 'Artist'
}, {
  key: 'artist.picture_small',
  label: 'Image'
}, {
  key: 'preview',
  label: 'URL'
}]
const q = ref('')
const audioSource = ref('')
const searchResult = ref([])
async function search() {
  const { data } = await useFetch('https://deezerdevs-deezer.p.rapidapi.com/search', {
    method: "GET",
    query: { q: q.value },
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': '51489ae2a5mshfbb0264ceb6f729p12b4c7jsn40366fca1850'
    },
    // pick: ['title']

  })
  console.log('data:', data.value.data)
  searchResult.value = data.value.data
 }

 function select (row) {
  // alert(row.preview)
  const audio = document.getElementById("audio")
  audio.src = row.preview
  audio?.play()
}
</script>
