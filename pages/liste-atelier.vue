<template>
  <div class="flex flex-col gap-y-10">
    <div class="bg-primary bg-opacity-10">
      <div class="px-6 lg:px-40 relative">
        <p class="font-redressed text-4xl py-10 text-center">Liste des ateliers</p>
        <breadcrumb class="absolute top-0" :pages="pages" />
      </div>
    </div>
    <div class="flex flex-col gap-y-6 px-6 lg:px-40">
      <div v-for="item in ateliers" class="grid gap-6 grid-cols-12 bg-primary bg-opacity-10">
        <div class="col-span-5">
          <img :src="item.img" alt="image" class="rounded-l-xl object-cover h-60 w-full">
        </div>
        <div class="col-span-7 flex flex-col gap-y-4 pr-6 py-6">
          <p class="text-xl">Atelier</p>
          <p class="font-redressed text-xl">Description</p>
          <p>{{item.desc}}</p>
          <div class="flex justify-end">
            <nuxt-link to="/atelier" class="bg-primary px-8 py-2 rounded-xl text-white cursor-pointer">
              Voir
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const pages = [
  { name: 'Liste des ateliers', href: '/liste-atelier' },
]

const atelierss = ref(null)

fetch("https://localhost:7110/api/Atelier", {
  method: "get",
  headers: {
    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
  }
}).then(async(result) => {
  const atelierResult = await result.json()
  atelierss.value = atelierResult
  console.log(atelierss.value)
})

const ateliers = ref([
  {
    img:"/_nuxt/assets/images/degust2.png",
    desc: "Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit"
  },
  {
    img:"/_nuxt/assets/images/degust2.png",
    desc: "Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit"
  },
  {
    img:"/_nuxt/assets/images/degust2.png",
    desc: "Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit Lorem ipsum dolor eit"
  },
])
</script>