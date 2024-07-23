<template>
    <p>All playlists</p>

    <UCard v-for="playlist in server_playlists"> 
       
        <p>
            <img :src="$config.public.storage+'/storage/v1/object/public/dtunes-content/public/'+username+'_'+playlist.name" width="50" height="50">
            <NuxtLink :to="{ name:'playlist-id',params:{id:playlist.id} }"> {{ playlist.name }}</NuxtLink>

        </p>
        

        
    <Placeholder class="h-32" />
    


  </UCard>


</template>

<script setup lang="ts">
const username=useCookie('username')

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