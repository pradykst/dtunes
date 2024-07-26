<template>
      <div style="font-size:20px;font-family:'Helvetica';">Disliked</div>


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

        <div>
            <UButton @click="playSong(usercontent.content)">Play</UButton>
        </div>




        <Placeholder class="h-32" />


    </UCard>
</template>


<script setup lang="ts">
const song = ref('')
let currentAutoPlaying = -1

const { data: server_usercontent, status, error, refresh, clear } = await useAsyncData(
    'server_usercontent',
    () => $fetch('/api/usercontent', {
        params: {
            name: useCookie('username').value,
            password: useCookie('password').value,
            like: false

        },

    })
)

function playPlaylist() {
    currentAutoPlaying++
    if (currentAutoPlaying < server_usercontent.value.length) {
        console.log(server_usercontent.value)
        playSong(server_usercontent.value[currentAutoPlaying].content)
    }
    else {
        currentAutoPlaying = -1
    }

    document.getElementById("audio").onended = function () {
        if (currentAutoPlaying > -1)
            playPlaylist()
    }

}

function playSong(content) {
    let audio = document.getElementById("audio")
    audio.src = content.url
    audio.play()
    song.value = content.title



}

</script>