<template>

  {{ server_usercontent ? (server_usercontent[0]?.playlist?.name) : '' }}

  <div>
    <UButton icon="i-heroicons-play" color="black" variant="solid" @click="playPlaylist">Play All</UButton>
  </div>

  <div>
    <audio id="audio" src='' controls></audio>
  </div>

  <div>
    <UBadge color="gray" variant="solid" size="lg">Now Playing {{ song }}</UBadge>
    </div>


  <UCard v-for="usercontent in server_usercontent">
    <p>{{ usercontent.content.title }}</p>
    <p>{{ usercontent.content.artist }}</p>
    <div v-if="usercontent.like == true">
      <UBadge color="white" variant="solid">Liked</UBadge>
    </div>
    <div v-if="usercontent.like == false">
      <UBadge color="white" variant="solid">Disliked</UBadge>
    </div>
    <div>
      <UButton @click="playSong(usercontent.content)">Play</UButton>
    </div>



    <Placeholder class="h-32" />


  </UCard>

</template>

<script setup lang="ts">

const song=ref('')
const route = useRoute()

const { data: server_usercontent, status, error, refresh, clear } = await useAsyncData(
  'server_usercontent',
  () => $fetch('/api/usercontent', {
    params: {
      name: useCookie('username').value,
      password: useCookie('password').value,
      playlistId: route.params.id

    },

  })
)

function playPlaylist() {

}

function playSong(content){
  let audio = document.getElementById("audio")
  audio.src = content.url
  audio.play()  
  song.value=content.title



}

</script>