<template>
    Liked


    <UCard v-for="usercontent in server_usercontent"> 
        <p>{{ usercontent.content.title }}</p>
        <p>{{ usercontent.content.artist }}</p>

        <audio id="audio" :src='usercontent.content.url' controls></audio>
        
    <Placeholder class="h-32" />


  </UCard>

</template>


<script setup lang="ts">

const { data:server_usercontent, status, error, refresh, clear } = await useAsyncData(
  'server_usercontent',
  () => $fetch('/api/usercontent',{
    params:{
        name: useCookie('username').value,
        password: useCookie('password').value,
        like:true

    },
    
  })
)

</script>