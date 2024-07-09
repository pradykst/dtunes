<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { _placeholderOpacity } from '#tailwind-config/theme';

const schema = object({
  // email: string().email('Invalid email').required('Required'),
  username: string().required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  name:string().required('Required'),
  photourl:string()  


})

type Schema = InferType<typeof schema>

const state = reactive({
  // email: undefined,
  username: undefined,
  password: undefined,
  name:undefined,
  photourl:undefined

})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  const { data, status, error, refresh } = await useFetch('/api/user', {
    method: "POST",
    body:event.data
  })
  console.log("data:", data)
  console.log("status:", status)
  console.log("error:", error)
  console.log("refresh:", refresh)

  if (data.value?.id) {
    const uname = useCookie('username')
    uname.value=event.data.username
    const pwd = useCookie('password')
    pwd.value=event.data.password

    await navigateTo('/')

  }
  else {
    alert("Something went wrong")
  }


}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UFormGroup label="Your Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Photo" name="photo">
      <UInput v-model="state.photourl"  />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>

  </UForm>
</template>