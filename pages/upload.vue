<template>
    <UInput
    type="file"
    size="sm"
    icon="i-heroicons-folder"
    @change="test"
  />
  <template>
    <UButton icon="i-heroicons-check-circle" @click="goBack">Done</UButton>
  </template>
  
</template>
  
<script setup lang="ts">
const supabase = useSupabaseClient()

async function test(event){
  console.log("uploading...",event[0])


// const contentFile = event.target.files[0]
const contentFile = event[0]

console.log(contentFile)

// const { data, error } = await supabase.storage.createBucket('content')
const { data, error } = await supabase.storage
  .from('dtunes-content')
  .upload('public/'+contentFile.name, contentFile)

  
console.log(data)
console.log(error)
}

function goBack() {

window.history.back()

}



</script> 