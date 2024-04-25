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
  modules: ["@nuxtjs/google-fonts","@pinia/nuxt"]
})