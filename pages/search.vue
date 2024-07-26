<template>
  <!-- <h1>Index fad</h1> -->

  <UButtonGroup size="xl" orientation="horizontal">
 


  <UInput v-model="q" name="q" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid" autocomplete="off"
    :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton v-show="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="q = ''" />
    </template>
  </UInput>
  <UButton  @click="search" :ui="{ rounded: 'rounded-full' }">Search</UButton>

</UButtonGroup>

  <div>  
    <br>
    <UButton v-if="!useLogin()" to="/login">Login</UButton>
    <UButton v-if="useLogin()" @click="logout()">Logout</UButton>
  </div>

  <!-- {{ searchResult }} -->
  <UTable :columns="columns" :rows=searchResult @select="select" />
</template>

<script setup lang="ts">
import useLogin from '~/composables/useLogin';

const content = useState('content', () => { })
const contentSearchTerm = useState('contentSearchTerm', () => { })
const contentSearchResult = useState('searchResult', () => { })

defineShortcuts({
  enter: {
    usingInput: 'q',
    handler: () => {
      search()
    }
  }
})



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
contentSearchTerm.value=q.value
contentSearchResult.value=data.value.data

}

onMounted(async()=>{
q.value=contentSearchTerm.value
searchResult.value=contentSearchResult.value

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
content.value=data.value
navigateTo('/content/'+data.value.id)
}
else{
navigateTo('/login')
}
}

function logout(){
useCookie('username').value=''
useCookie('password').value=''
console.log('logged out ')

}
</script>
