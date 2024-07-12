<template>





  <UButton v-if="!useLogin()" to="/login">Login</UButton>
  <UButton v-if="useLogin()" @click="logout()">Logout</UButton>

  <h1> DTunes</h1>


  <div>
    <UButton label="Open" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10" square padded @click="isOpen = false" />
          <UButton to="/search" icon="i-heroicons-magnifying-glass" size="xl" color="primary" square variant="solid">Search</UButton>
        <Placeholder class="h-full" />
      </div>
    </USlideover>
  </div>

  <div>
    <p>Playlists</p>
    
    <br>

    <UCard>

    <template #header>
      <Placeholder class="h-8" />
      Liked Songs
    </template>

    <Placeholder class="h-32" />
    <UButton v-if='useLogin()' to="/playlist/liked">Show</UButton>

  </UCard>  

  <br>
 

  <UCard>
    <template #header>
      <Placeholder class="h-8" />
      Disliked songs
    </template>

    <Placeholder class="h-32" />
    <UButton v-if='useLogin()' to="/playlist/disliked">Show</UButton>

  
  </UCard>  
  <br>
  <UCard>
    <template #header>
      Other Playlists
      <Placeholder class="h-8" />
    </template>

    <Placeholder class="h-32" />
    <UButton v-if='useLogin()' to="playlist/playlists">Other</UButton>

  </UCard>  
  </div>




</template>

<script setup lang="ts">


const isOpen = ref(false)


import useLogin from '~/composables/useLogin';

const content = useState('content', () => { })
const contentSearchTerm = useState('contentSearchTerm', () => { })
const contentSearchResult = useState('searchResult', () => { })


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
  //also save in state so that page navigation doesnt clear
  contentSearchTerm.value = q.value
  contentSearchResult.value = data.value.data

}

onMounted(async () => {
  q.value = contentSearchTerm.value
  searchResult.value = contentSearchResult.value


})


async function select(row) {
  // alert(row.preview)

  //user logged in
  if (useLogin()) {


    // const audio = document.getElementById("audio")
    // audio.src = row.preview
    // audio?.play()

    const { data, status, error, refresh } = await useFetch('/api/content', {
      method: "POST",
      body: {
        name: useCookie('username').value,
        password: useCookie('password').value,
        content: {
          title: row.title,
          artist: row.artist.name,
          language: '',
          genre: '',
          url: row.preview
        }
      }
    })
    console.log(data.value)
    content.value = data.value
    navigateTo('/content/' + data.value.id)
  }
  else {
    navigateTo('/login')
  }
}

function logout() {
  useCookie('username').value = ''
  useCookie('password').value = ''
  console.log('logged out ')

}
</script>
