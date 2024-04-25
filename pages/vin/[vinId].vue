<template>
  <div class="bg-primary p-6 lg:px-40 flex items-center justify-center text-white text-xl">
    <h1>{{ vinStore.currentVin.nom }}</h1>
  </div>
  <breadcrumb class="px-6 lg:px-40 pt-3" :pages="pages" />
  <div class="px-6 lg:px-40 mt-4">
    <div class="flex flex-col lg:flex-row py-12">
      <div class="w-full lg:w-2/3 mb-4 lg:mb-0">
        <p class="text-center text-xl text-gray-500 mb-2 lg:mb-0">{{ vinStore.currentVin.annotation }}</p>
        <div class="flex justify-start space-x-6 md:order-2 mt-4 py-12">
          <p class="text-xl">
            Région : <strong>{{ vinStore.currentVin.region }}</strong>
          </p>
          <p class="text-xl">
            Millésime : <strong>{{ vinStore.currentVin.millesime }}</strong>
          </p>
          <p class="text-xl">
            Cépage : <strong>{{ vinStore.currentVin.cepage }}</strong>
          </p>
        </div>
      </div>
      <div class="w-full lg:w-1/2">
        <img src="../../assets/images/vins/chateau-de-france-pessac-leognan-rouge.png" alt="Vin">
      </div>
    </div>

  </div>
</template>

<script setup>
import { useVinStore } from "~/stores/vin.js";

const { vinId } = useRoute().params
const vinStore = useVinStore()

await vinStore.getVin(vinId);

const pages = [
  { name: 'Stock', href: '/stock' }
]

</script>