<template>
  <div class="font-roboto">
    <div class="w-full h-80 bg-[url('/_nuxt/assets/images/bannerHome.png')] bg-cover flex flex-col gap-y-4 items-center justify-center text-white">
      <p class="font-redressed text-5xl">Dégustation de vin</p>
      <a href="/liste-atelier" class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 border-white rounded-full hover:text-white group">
        <span class="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M245.66,42.34l-32-32a8,8,0,0,0-11.32,11.32l1.48,1.47L148.65,64.51l-38.22,7.65a8.05,8.05,0,0,0-4.09,2.18L23,157.66a24,24,0,0,0,0,33.94L64.4,233a24,24,0,0,0,33.94,0l83.32-83.31a8,8,0,0,0,2.18-4.09l7.65-38.22,41.38-55.17,1.47,1.48a8,8,0,0,0,11.32-11.32ZM96,107.31,148.69,160,104,204.69,51.31,152ZM81.37,224a7.94,7.94,0,0,1-5.65-2.34L34.34,180.28a8,8,0,0,1,0-11.31L40,163.31,92.69,216,87,221.66A8,8,0,0,1,81.37,224ZM177.6,99.2a7.92,7.92,0,0,0-1.44,3.23l-7.53,37.63L160,148.69,107.31,96l8.63-8.63,37.63-7.53a7.92,7.92,0,0,0,3.23-1.44l58.45-43.84,6.19,6.19Z"></path></svg>
      </span>
        <span class="relative">Liste des Ateliers</span>
      </a>
    </div>
    <div class="flex flex-col gap-y-20">
      <div class="flex flex-col px-6 lg:px-40">
        <p class="font-redressed text-center text-3xl py-10">Listes des Évènements à venir</p>
        <div class="lg:grid grid-cols-12 lg:gap-8 gap-4 flex overflow-scroll scrollbar-hide">
          <card-event class="lg:col-span-3" v-for="(item,i) in event" :data="item" />
        </div>
      </div>
      <div class="flex flex-col lg:flex-row justify-between items-center bg-primary bg-opacity-10 rounded-lg gap-4 py-20 px-6 lg:px-20 lg:mx-40">
        <div v-for="item in experience" class="flex lg:flex-col flex-row justify-center gap-4 items-center">
          <img class="lg:!w-[162px] lg:h-[146px] !w-[100px] h-[90px]"  :src="item.img" alt="image">
          <p class="lg:text-center">{{item.desc}}</p>
        </div>
      </div>
      <div class="bg-[url('/_nuxt/assets/images/bottle.svg')] relative mb-60" style="height: 490px; left: -100px;">
        <div class="absolute top-8 right-0 border-4 border-primary lg:w-1/3 bg-white p-5">
          <img :src="infoDescription?.image" alt="prof" class="w-full">
          <svg-icon v-if="isConnected" class="absolute cursor-pointer text-white h-10 w-10 p-2 bg-primary rounded-full top-8 right-8 p-1" type="mdi" :path="mdiPencil" />
          <p class="text-center font-redressed text-4xl my-4">{{infoDescription?.title}}</p>
          <p class="text-justify">{{ infoDescription?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import CardEvent from "~/components/cardEvent.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil } from '@mdi/js'

const event = ref([])

const isConnected = !!localStorage.getItem("accessToken")


const experience = ref([
  {
    img:"/_nuxt/assets/images/vigne.svg",
    desc: "Explorez les délices du vin lors de notre atelier de dégustation. Plongez dans l'univers captivant du vin, découvrez les cépages, les régions viticoles et les techniques de vinification.",
  },
  {
    img:"/_nuxt/assets/images/nose.svg",
    desc: "Rejoignez-nous pour une aventure sensorielle où plaisir et découverte se conjuguent à la perfection, pour des souvenirs gustatifs qui raviront votre palais et éveilleront vos papilles.",
  },
  {
    img:"/_nuxt/assets/images/glasses.svg",
    desc: "Participez à une aventure exquise dans une ambiance conviviale et élégante, où chaque gorgée de vin devient une invitation à l'émerveillement et à la découverte.",
  }
])

fetch("https://localhost:7110/api/Evenement", {
  method: "get",
  headers: {
    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
  }
}).then(async(result) => {
  event.value = await result.json()
  console.log(event.value)
})

const infoDescription = ref(null)

const getHomeDescriptionbyId = function () {
  fetch('https://localhost:7110/api/HomeDescription', {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }
  })
      .then(async (result) => {
        const homeDescriptionResult = await result.json();
        infoDescription.value = homeDescriptionResult[0];
        console.log(infoDescription.value)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la description de la maison :', error);
      });
};

getHomeDescriptionbyId()

</script>