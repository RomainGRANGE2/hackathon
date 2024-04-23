<template>
  <div class="font-roboto">
    <div class="w-full h-80 bg-[url('/_nuxt/assets/images/bannerHome.png')] bg-cover flex flex-col gap-y-4 items-center justify-center text-white">
      <p class="font-redressed text-5xl">Dégustation de vin</p>
      <div class="bg-primary py-1 px-3 cursor-pointer  rounded-md font-roboto">
        Évenement à venir
      </div>
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
      <div class="w-full bg-primary px-6 lg:px-40">
        <div class="flex lg:flex-row flex-col gap-y-4 lg:gap-y-0 gap-x-10 py-6">
          <div class="lg:w-1/2">
            <img src="/_nuxt/assets/images/prof.jpg" alt="prof">
          </div>
          <div class="lg:w-1/2 flex flex-col justify-center gap-y-4 text-white">
            <p class="text-left font-redressed text-4xl">Qui suis-je ?</p>
            <p>Découvrez Olivier, un passionné de vin et d'œnologie dont l'amour pour le divin nectar transcende les frontières du simple plaisir gustatif pour devenir un art de vivre.
              Depuis son plus jeune âge, Olivier a été captivé par l'univers fascinant du vin. Ce n'est pas seulement une boisson pour lui, mais une véritable passion qui l'a conduit à explorer les vignobles du monde entier, à déguster des cépages variés et à perfectionner son palais pour distinguer les subtilités des arômes et des saveurs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import CardEvent from "~/components/cardEvent.vue";

const event = ref([])

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

</script>