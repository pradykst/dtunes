<template>


    <audio id="audio" src='' controls></audio>

    <p>

        {{ content.artist + ': ' }}
        {{ content.title }}
    </p>

 
    <UButton @click='like(true)' icon="i-heroicons-hand-thumb-up" size="xl" color="primary" square variant="solid" />
    
    <UButton @click='like(false)' icon="i-heroicons-hand-thumb-down" size="xl" color="red" square variant="solid" />

    <UButton @click='playlist' icon="i-heroicons-plus" size="xl" color="yellow" square variant="solid" />

    <p>

    </p>







</template>

<script setup lang="ts">
const content = useState('content', () => { })
const userContent = useState('userContent', () => { })

// const props = defineProps(['content'])

onMounted(async () => {
    console.log(content)
    const audio = document.getElementById("audio")
    audio.src = content.value.url



})

async function like(flag){

    const { data, status, error, refresh } = await useFetch('/api/usercontent', {
    method: "POST",
    body:{
        name: useCookie('username').value,
        password: useCookie('password').value,
        title:content.value.title,
        like: flag

    }

  })
   userContent.value=data.value


    

}



function playlist(){
    navigateTo('/playlist/')


}




</script>
