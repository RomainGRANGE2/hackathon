<template>
  <div>
    <div class="w-full h-80 bg-[url('/_nuxt/assets/images/bannerHome.png')] bg-cover flex flex-col gap-y-4 items-center justify-center text-white">
      <p class="font-redressed text-5xl">Dégustation de vin</p>
      <div class="bg-primary py-1 px-3 cursor-pointer  rounded-md font-roboto">
        Évenement à venir
      </div>
    </div>
    <div class="flex flex-col gap-y-20">
      <div class="flex flex-col p-6 lg:px-8">
        <p class="font-redressed text-center text-3xl py-10">Listes des Évènements à venir</p>
        <div class="grid grid-cols-12 gap-8">
          <card-atelier class="col-span-3 w-full" v-for="(item,i) in ateliers" :data="item" />
        </div>
      </div>
      <div class="flex justify-between items-center bg-primary bg-opacity-10 rounded-lg gap-x-4 py-20 px-6 lg:px-8">
        <div v-for="item in experience" class="flex flex-col justify-center gap-y-4 items-center">
          <img :src="item.img" alt="image">
          <p class="text-center">{{item.desc}}</p>
        </div>
      </div>
      <div class="w-full bg-primary">
        <div class="p-6 lg:px-8">
          <p>d</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

const ateliers = ref([])

const experience = ref([
  {
    img:"/_nuxt/assets/images/vigne.png",
    desc: "Explorez les délices du vin lors de notre atelier de dégustation. Plongez dans l'univers captivant du vin, découvrez les cépages, les régions viticoles et les techniques de vinification.",
  },
  {
    img:"/_nuxt/assets/images/nose.png",
    desc: "Rejoignez-nous pour une aventure sensorielle où plaisir et découverte se conjuguent à la perfection, pour des souvenirs gustatifs qui raviront votre palais et éveilleront vos papilles.",
  },
  {
    img:"/_nuxt/assets/images/glasses.png",
    desc: "Participez à une aventure exquise dans une ambiance conviviale et élégante, où chaque gorgée de vin devient une invitation à l'émerveillement et à la découverte.",
  }
])

fetch("https://localhost:7110/api/Atelier", {
  method: "get",
  headers: {
    "Authorization" : `Bearer ${localStorage.getItem("accesToken")}`
  }
}).then(async(result) => {
  ateliers.value = await result.json()
  console.log(ateliers.value)
})

</script>