<template>
  <div class="flex flex-col gap-y-10">
    <div class="bg-primary bg-opacity-10">
      <breadcrumb class="px-6 lg:px-40 pt-3" :pages="pages" />
      <div class="p-6 lg:px-40">
        <p class="font-redressed text-4xl mb-6">Atelier</p>
        <div class="flex gap-x-8">
          <div class="w-5/12">
            <img src="/_nuxt/assets/images/degust3.png" alt="image">
          </div>
          <div class="w-7/12 flex flex-col justify-center gap-y-4">
            <p class="font-redressed text-xl">Description</p>
            <p>Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-10 px-6 lg:px-40">
      <p class="font-redressed text-2xl text-center">Evenement</p>
      <div class="grid grid-cols-12 gap-4">
        <card-event-in-atelier class="col-span-4" v-for="item in event" :data="item" />
      </div>
    </div>
  </div>
</template>
<script setup>
import CardEventInAtelier from "~/components/cardEventInAtelier.vue";

const pages = [
  { name: 'Atelier', href: '/atelier' },
]

const event = ref([
  {
    img: "/_nuxt/assets/images/degust2.png",
    name: "Degustation",
    localisation: "Lyon",
    date: "23/04/2024",
    prix: 55
  },
  {
    img: "/_nuxt/assets/images/degust2.png",
    name: "Degustation",
    localisation: "Lyon",
    date: "23/04/2024",
    prix: 55
  },
  {
    img: "/_nuxt/assets/images/degust2.png",
    name: "Degustation",
    localisation: "Lyon",
    date: "23/04/2024",
    prix: 55
  },
  {
    img: "/_nuxt/assets/images/degust2.png",
    name: "Degustation",
    localisation: "Lyon",
    date: "23/04/2024",
    prix: 55
  },
  {
    img: "/_nuxt/assets/images/degust2.png",
    name: "Degustation",
    localisation: "Lyon",
    date: "23/04/2024",
    prix: 55
  },
  {
    img: "/_nuxt/assets/images/degust2.png",
    name: "Degustation",
    localisation: "Lyon",
    date: "23/04/2024",
    prix: 55
  }
])

</script>