<template>
  <div class="bg-primary flex flex-col gap-y-6 bg-opacity-10">
    <breadcrumb :pages="pages" class="px-6 lg:px-40" />
    <div class="flex justify-between items-center px-6 lg:px-40">
      <div class="flex flex-col gap-y-4">
        <p class="font-redressed text-5xl">Evenement dégustation</p>
        <div class="flex flex-col gap-y-1">
          <p>Gironde Bordeaux, France</p>
          <p>Mardi 7 mai 2024</p>
        </div>
      </div>
      <div class="cursor-pointer">
        <svg-icon class="text-gray-500" :path="mdiExportVariant" type="mdi" />
      </div>
    </div>
    <div class="flex gap-x-4 overflow-scroll scrollbar-hide h-80 px-2">
      <img v-for="item in images" :src="item.url" class="rounded-2xl" alt="image">
    </div>
    <div class="grid grid-cols-12 px-6 lg:px-40 my-40">
      <div class="col-span-9 flex flex-col gap-y-6 w-1/2">
        <p class="font-redressed text-xl">Description</p>
        <p>Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit</p>
      </div>
      <div class="col-span-3 flex flex-col p-6 gap-y-2 rounded-xl bg-white shadow-2xl">
        <p class="font-bold">70.00 € / persone</p>
        <input type="text" class="rounded-2xl border-gray-400 border pl-4 py-2" placeholder="Adresse e-mail">
        <div class="bg-primary w-full rounded-2xl text-center py-2 cursor-pointer text-white">
          S'inscrire
        </div>
      </div>
    </div>
    <div class="bg-primary">
      <div class="px-6 lg:px-40 pb-10 flex flex-col gap-y-4 pt-4">
        <p class="text-4xl font-redressed text-white text-center">Autre dates</p>
        <div class="flex flex-col gap-y-4">
          <div v-for="item in otherDates" class="grid gap-x-4 grid-cols-12 bg-white rounded-xl">
            <div class="col-span-5">
              <img :src="item.img" alt="image" class="h-60 w-full object-cover rounded-l-xl">
            </div>
            <div class="col-span-7 flex flex-col py-6 pr-6 relative">
              <p>Dégustation</p>
              <p>{{item.location}}</p>
              <p>{{item.date}}</p>
              <div class="absolute bottom-6 flex justify-between items-center w-full pr-6">
                <p>{{item.price}} € / perosnne</p>
                <nuxt-link to="/liste-atelier" class="bg-primary rounded-2xl text-center py-2 px-8 cursor-pointer text-white">
                  Voir
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from "~/components/breadcrumb.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiExportVariant } from '@mdi/js';

const images = ref([
  {
    url:"/_nuxt/assets/images/degust1.png"
  },
  {
    url:"/_nuxt/assets/images/degust2.png"
  },
  {
    url:"/_nuxt/assets/images/degust3.png"
  },
  {
    url:"/_nuxt/assets/images/degust1.png"
  },
  {
    url:"/_nuxt/assets/images/degust2.png"
  },
  {
    url:"/_nuxt/assets/images/degust3.png"
  }
])

const otherDates = ref([
  {
    img:"/_nuxt/assets/images/degust1.png",
    location : "Rhône Lyon, France",
    date: "Samedi 15 juin",
    price: "55"
  },
  {
    img:"/_nuxt/assets/images/degust1.png",
    location : "Rhône Lyon, France",
    date: "Samedi 15 juin",
    price: "55"
  },
  {
    img:"/_nuxt/assets/images/degust1.png",
    location : "Rhône Lyon, France",
    date: "Samedi 15 juin",
    price: "55"
  }
])

const pages = [
  { name: 'Evenement dégustation', href: '/event' },
]
</script>