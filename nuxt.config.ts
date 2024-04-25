import { defineNuxtConfig } from '@nuxt/bridge'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts:{
    display: "swap",
    families: {
      Redressed: {},
      Roboto:{},
      Rubik:{
        wght:[400,800]
      }
    }
  },
  router: {
    base: 'http://localhost:3000/' // Replace 'your-base-path' with your desired base path
  },
  modules: ["@nuxtjs/google-fonts","@pinia/nuxt"]
})