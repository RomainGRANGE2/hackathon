<template>
  <div class="flex flex-col lg:gap-y-10 gap-y-4">
    <breadcrumb class="lg:hidden px-6" :pages="pages" />
    <div class="bg-primary bg-opacity-10">
      <div class="px-6 lg:px-40 relative">
        <p class="font-redressed text-4xl py-10 text-center">Liste des ateliers</p>
        <breadcrumb class="hidden lg:block absolute top-0 mt-3" :pages="pages" />
      </div>
    </div>
    <div class="flex flex-col gap-y-6 px-6 lg:px-40">
      <div v-for="item in ateliers" class="lg:grid flex flex-col rounded-xl lg:gap-6 gap-4 grid-cols-12 bg-primary bg-opacity-10">
        <div class="col-span-5 min-h-60 lg:h-auto">
          <img :src="item.image.length > 0 ? 'data:image/png;base64,' + item.image[item.image.length-1]?.data : '/_nuxt/assets/images/degust1.png'" alt="image" class="lg:rounded-l-xl object-cover h-full w-full">
        </div>
        <div class="col-span-7 flex flex-col gap-y-4 lg:pr-6 lg:py-6 p-4">
          <p class="text-xl">{{item.atelierName}}</p>
          <p class="font-redressed text-xl">Description</p>
          <p>{{item.description}}</p>
          <div class="flex justify-end">
            <nuxt-link @click="setAtelierInStore(item)"  to="/atelier" class="bg-primary px-8 py-2 rounded-xl text-white cursor-pointer">
              Voir
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useAtelierStore} from "~/stores/atelier.js";

const atelierStore = useAtelierStore()

const pages = [
  { name: 'Liste des ateliers', href: '/liste-atelier' },
]

const ateliers = ref(null)

fetch("https://localhost:7110/api/Atelier", {
  method: "get",
  headers: {
    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
  }
}).then(async(result) => {
  const atelierResult = await result.json()
  ateliers.value = atelierResult
  console.log(ateliers.value)
})

const setAtelierInStore = function (atelier){
  atelierStore.currentAtelier = atelier
}

</script>