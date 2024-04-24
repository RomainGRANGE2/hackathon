<template>
  <div class="flex flex-col gap-y-10">
    <div class="bg-primary bg-opacity-10">
      <breadcrumb class="px-6 lg:px-40 pt-3" :pages="pages" />
      <div class="p-6 lg:px-40">
        <p class="font-redressed text-4xl mb-6">{{atelierStore.currentAtelier.atelierName}}</p>
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
        <card-event-in-atelier class="col-span-4" v-for="item in events" :data="item" />
      </div>
    </div>
  </div>
</template>
<script setup>
import CardEventInAtelier from "~/components/cardEventInAtelier.vue";
import {useAtelierStore} from "~/stores/atelier.js";
const router = useRouter()

const atelierStore = useAtelierStore()

const events = ref([])

if(atelierStore.currentAtelier == null){
  router.push("/")
} else {
  fetch("https://localhost:7110/api/Evenement", {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    const eventResult = await result.json()
    events.value = eventResult.filter(x => x.atelierId == atelierStore.currentAtelier.atelierId)
    console.log(events.value)
  })
}

const pages = [
  { name: 'Liste ateliers', href: '/liste-atelier' },
  { name: 'Atelier', href: '/atelier' },
]
</script>