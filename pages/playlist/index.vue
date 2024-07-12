<script setup lang="ts">
const playlistName = ref('')
const content = useState('content', () => { })
const userContent = useState('userContent', () => { })

const isOpen = ref(false)
const selected = ref()
const query = ref('')
function newplaylist() {
    isOpen.value = false
    const { data, status, error, refresh } = useFetch('/api/playlist', {
    method: "POST",
    body: {
        name: useCookie('username').value,
        password: useCookie('password').value,
        playlistName:playlistName.value,
        userContentId: userContent.value.id

    } })
}

function addToPlaylist(){
    const { data, status, error, refresh } = useFetch('/api/usercontent', {
    method: "PATCH",
    body: {
        name: useCookie('username').value,
        password: useCookie('password').value,
        playlistName:selected.value,
        userContentId: userContent.value.id

    } })
    


}


const { data:server_playlists, status, error, refresh, clear } = await useAsyncData(
  'server_playlists',
  () => $fetch('/api/playlist',{
    params:{
        name: useCookie('username').value,
        password: useCookie('password').value

    },
    // pick:['name']
  })
)



const playlists = server_playlists.value?.map(pl=>pl.name)


</script>

<template>
    <UFormGroup>
        <USelectMenu v-model="selected" :query="query" :options="playlists" placeholder="Select a playlist"
            searchable />
        <UButton @click="addToPlaylist" >Add to selected Playlist</UButton>

    </UFormGroup>


    <div>
        <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid" label="Create Playlist"
            :trailing="false" @click="isOpen=true" />


        <UModal v-model="isOpen">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <Placeholder class="h-8" />
                    New Playlist
                </template>

                <Placeholder class="h-32" />
                Name
                <UTextarea v-model="playlistName" />

                <template #footer>
                    <Placeholder class="h-8" />
                    Create Playlist
                    <UButton icon="i-heroicons-check" size="sm" color="primary" square variant="solid" @click="newplaylist"/>
                </template>
            </UCard>
        </UModal>
    </div>

</template>
