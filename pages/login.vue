<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const toast = useToast()


const schema = object({
  // email: string().email('Invalid email').required('Required'),
  username: string().required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  // email: undefined,
  username: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  const { data, status, error, refresh } = await useFetch('/api/user', {
    method: "GET",
    query: { username: event.data.username, password: event.data.password }
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
    toast.add({ title: 'Logged In Succesfully' })

  }
  else {
     toast.add({ title: 'Invalid Login Credentials' })
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

    <UButton type="submit" block color="gray">
      Login
    </UButton>
    <UDivider
    label="New User"
    :ui="{ label: 'text-primary-500 dark:text-primary-400' }"
  />


    <UButton to="/register" block>Register</UButton>


  </UForm>
</template>