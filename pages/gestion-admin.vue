<template>
  <div class="px-6 lg:px-40">
    <div class="grid grid-cols-12">
      <div class="col-span-4 flex flex-col gap-y-4">
        <div v-for="item in ateliers" class="py-4 cursor-pointer hover:text-gray-700" @click="setSelectAtelier(item)">
          <p>{{item.atelierName}}</p>
        </div>
        <div class="py-4 cursor-pointer hover:text-gray-700" @click="addAtelier()" >
          <svg-icon :path="mdiNewBox" type="mdi" class="w-8 h-8" />
        </div>
      </div>
      <div class="col-span-8">
        <div v-if="atelierSelected != null || newAtelier">
          <p>Infos de l'atelier</p>
          <div class="isolate mt-10">
            <form @submit.prevent="validFormAtelier()">
              <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nom</label>
                  <div class="mt-2.5">
                    <input v-model="formAtelier.atelierName" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Date</label>
                  <div class="mt-2.5">
                    <input v-model="formAtelier.date" required type="date" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">Thematique</label>
                  <div class="mt-2.5">
                    <input v-model="formAtelier.thematique" required type="text" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">Ressources</label>
                  <div class="mt-2.5">
                    <input v-model="formAtelier.ressource" type="text" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Image</label>
                  <div class="mt-2.5">
                    <input type="file" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                  <div class="mt-2.5">
                    <textarea v-model="formAtelier.description" rows="4" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div class="mt-10">
                <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{newAtelier.value ? "Créer" : "Modifier"}}{{newAtelier}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiNewBox } from '@mdi/js';
import {format, parse} from "date-fns";
const router = useRouter()

const isConnected = !!localStorage.getItem("accessToken")

if(!isConnected){
  router.push("/")
}

const fhuizuhizf = ref(null)

const ateliers = ref(null)
const atelierSelected = ref(null)
const formAtelier = ref({
  atelierName: null,
  description: null,
  thematique: null,
  date: null,
  ressource: null
})
const newAtelier = ref(false)

const getAllAtelelier = function (){
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
}

getAllAtelelier()

const setSelectAtelier = function (atelier){
  atelierSelected.value = atelier
  newAtelier.value = false
  formAtelier.value = {
    atelierName: atelier.atelierName,
    date: atelier.date,
    ressource: atelier.ressource,
    image: atelier.images,
    thematique: atelier.thematique,
    description: atelier.description
  }
}

const addAtelier = function (){
  newAtelier.value = true
}

const validFormAtelier = function (){

  const url = newAtelier.value ? "https://localhost:7110/api/Atelier" : `https://localhost:7110/api/Atelier/${atelierSelected.value.atelierId}`

  fetch("https://localhost:7110/api/Atelier", {
    method: newAtelier.value ? "post" : "put",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(formAtelier.value)
  }).then(async(result) => {
    getAllAtelelier()
  })
}

</script>
