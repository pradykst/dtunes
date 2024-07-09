<!-- <script>

const { data, error } = await supabase.storage.createBucket('content')

const contentFile = event.target.files[0]
const { data, error } = await supabase.storage
  .from('content')
  .upload('public/avatar1.png', contentFile)


</script> -->

<template>
    <UInput type="file" size="sm" icon="i-heroicons-magnifying-glass-20-solid" />
</template>
  
  