<template>





  <UButton v-if="!useLogin()" to="/login">Login</UButton>


  <h1 style="font-size:45px;font-family:'Helvetica';">DTunes</h1>


  <div>
    <UButton label="Open" @click="isOpen = true" color="gray" variant="solid" size="lg" />

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              DTunes
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>


        <UVerticalNavigation :links="links" class="w-full" :ui="{
          label: 'truncate relative text-gray-900 dark:text-white flex-initial w- text-left'
        }" />

        <Placeholder class="h-full" />
      </UCard>
    </USlideover>
  </div>

  <div>
    <br>
    <p style="font-size:25px;">Playlists</p>

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
        All Playlists
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

function click() {
  if (useLogin()) {
    logout()
    navigateTo('/login')
  }
}

const links = [
  [{
    label: 'Profile',
    to: '/profile',
    icon: 'i-heroicons-user',
    badge: 'User'
  }, {
    label: 'Playlists',
    icon: 'i-heroicons-play',
    to: `/playlist/playlists`
  }
  ],
  [{
    label: 'Search',
    icon: 'i-heroicons-magnifying-glass',
    to: '/search'
  }],


  [{
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings'
  }, {
    label: 'Logout',
    icon: 'i-heroicons-user-minus',
    click

  }]
]

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
