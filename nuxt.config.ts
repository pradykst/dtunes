// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  supabase: {
    redirect: false
    
},
runtimeConfig: {
  // The private keys which are only available within server-side
  apiSecret: '123',
  // Keys within public, will be also exposed to the client-side
  public: {
    apiBase: '/api',
    storage:''
  }
}
})