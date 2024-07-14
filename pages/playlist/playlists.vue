<template>
    <p>All playlists</p>

    <UCard v-for="playlist in server_playlists"> 
       
        <p>
            <NuxtLink :to="{ name:'playlist-id',params:{id:playlist.id} }"> {{ playlist.name }}</NuxtLink>
        </p>
        

        
    <Placeholder class="h-32" />
    


  </UCard>


</template>

<script setup lang="ts">

const { data:server_playlists, status, error, refresh, clear } = await useAsyncData(
  'server_playlists',
  () => $fetch('/api/playlist',{
    params:{
        name: useCookie('username').value,
        password: useCookie('password').value

    },
  })
)



</script>