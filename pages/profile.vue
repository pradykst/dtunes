<template>
    <div style="font-size: 25px;text-align: center;">
        Profile
    </div>
    <br>
    <div style="font-size: 20px;text-align: center;">
        Change Password
    </div>
    <!-- <div style="text-align: center;">
        <UButtonGroup size="sm" orientation="horizontal">
            <UButton label="Name" color="white" />
            <UInput v-model="name" color="primary" variant="outline" placeholder="Name" />
            <UButton label="Change" color="gray" @click="changeName" />
        </UButtonGroup>

    </div> -->
    <br>
    <div style="text-align: center;">
        <UButtonGroup size="sm" orientation="horizontal">
            <UButton label="Username" color="white" />
            <UInput v-model="uname" color="primary" variant="outline" placeholder="Username" />
        </UButtonGroup>
    </div>
    <div style="text-align: center;">
        <UButtonGroup size="sm" orientation="horizontal">
            <UButton label="Password" color="white" />
            <UInput v-model="opswd" color="primary" variant="outline" placeholder="Password" />
        </UButtonGroup>
    </div>
    
    
    <br>
    <div style="text-align: center;">
        <UButtonGroup size="sm" orientation="horizontal">
            <UButton label="New Password" color="white" />
            <UInput v-model="pswd" color="primary" variant="outline" placeholder="Password" />
            <UButton label="Change" color="gray" @click="changePswd" />
        </UButtonGroup>
        <div v-if="change" style="text-align: center; color: lime;">
            Password changed successfully!
        </div>


    </div>
    <br>
    <div style="text-align: center;">
        <UButton label="Home" to="/" />
    </div>





</template>

<script setup lang="ts">
// const name = ref('')
const pswd = ref('')
const uname = ref('')
const opswd = ref('')

let change = ref(false)

// async function changeName() {
//     const { data, status, error, refresh } = await useFetch('/api/user', {
//         method: "PATCH",
//         body: {
//             username: useCookie('username').value,
//             password: useCookie('password').value,
//             newName: name.value


//         }
//     })

// }

async function changePswd() {
    const { data, status, error, refresh } = await useFetch('/api/user', {
        method: "PATCH",
        body: {
            username: uname.value,
            password: opswd.value,
            newPswd: pswd.value


        }
    })
    if (data) {
        change.value = true
        console.log('hyes')
    }

}


</script>
