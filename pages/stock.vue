<template>
  <div class="px-6 lg:px-40">
    <div class="flex flex-col gap-y-4 items-center justify-center">
      <p class="font-redressed text-2xl">Liste de vos vins</p>
      <svg-icon @click="addNewVin()" class="cursor-pointer p-4 bg-primary text-white rounded-md" size="60" type="mdi" :path="mdiFolderPlusOutline" />
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3 bg-primary p-4 text-white rounded-md mt-4" v-for="item in allVins">
        <p class="text-center font-redressed text-xl">{{item.nom}}</p>
        <p>Cépage: {{item.cepage}}</p>
        <p>Région: {{item.region}}</p>
        <p>Millesime: {{item.millesime}}</p>
        <p>Annotation: {{item.annotation}}</p>
        <p>Quantité: {{item.quatite}}</p>
        <div class="flex justify-end">
          <div class="bg-white p-2 rounded-md flex gap-x-2">
            <div @click="addVins(item)" class="bg-green-400 cursor-pointer">
              <svg-icon :path="mdiPlus" type="mdi" />
            </div>
            <div @click="lessVins(item)" class="bg-red-400 cursor-pointer">
              <svg-icon :path="mdiMinus" type="mdi" />
            </div>
            <div @click="editVin(item)" class="cursor-pointer">
              <svg-icon :path="mdiPencil" type="mdi" class="text-black" />
            </div>
            <div @click="deleteVin(item)" class="cursor-pointer">
              <svg-icon :path="mdiDelete" type="mdi" class="text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
              class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{isEdit ? "Modifier un vin" : "Créer un vin"}}
                </DialogTitle>

                <form @submit.prevent="validFormVins()" class="mt-2">
                  <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nom</label>
                      <div class="mt-2.5">
                        <input v-model="formVin.nom" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Region</label>
                      <div class="mt-2.5">
                        <input v-model="formVin.region" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Millesime</label>
                      <div class="mt-2.5">
                        <input v-model="formVin.millesime" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Cépage</label>
                      <div class="mt-2.5">
                        <input v-model="formVin.cepage" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Annotation</label>
                      <div class="mt-2.5">
                        <input v-model="formVin.annotation" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Quantite</label>
                      <div class="mt-2.5">
                        <input v-model="formVin.quatite" required type="number" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{isEdit ? "Modifier" : "Ajouter"}}</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup>
import {DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Dialog} from "@headlessui/vue";

const router = useRouter()
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFolderPlusOutline,mdiPlus,mdiMinus,mdiPencil,mdiDelete } from '@mdi/js'

const isConnected = !!localStorage.getItem("accessToken")

if(!isConnected){
  router.push("/")
}

const allVins = ref([])

const isOpen = ref(false)

const closeModal = function (){
  isOpen.value = false
}

const formVin = ref({
  nom:null,
  region:null,
  millesime:null,
  cepage:null,
  annotation:null,
  quatite:null
})

const sortById = function (a,b){
  if (a.vinId < b.vinId) {
    return -1;
  }
  if (a.vinId > b.vinId) {
    return 1;
  }
  return 0;
}

const getAllVins = function (){
  fetch("https://localhost:7110/api/Vin", {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    const vinsResult = await result.json()
    allVins.value = vinsResult.sort(sortById)
  })
}

const validFormVins = function (){
  const url = isEdit.value ? `https://localhost:7110/api/Vin/${formVin.value.vinId}` : "https://localhost:7110/api/Vin"
  fetch(url, {
    method: isEdit.value ? "put" : "post",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(formVin.value)
  }).then(async(result) => {
    getAllVins()
    isOpen.value = false
  })
}

const addVins = function (vin){
  fetch(`https://localhost:7110/api/Vin/${vin.vinId}`, {
    method: "put",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({
      ...vin,
      quatite: vin.quatite + 1
    })
  }).then(async(result) => {
    getAllVins()
  })
}

const lessVins = function (vin){
  fetch(`https://localhost:7110/api/Vin/${vin.vinId}`, {
    method: "put",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({
      ...vin,
      quatite: vin.quatite - 1
    })
  }).then(async(result) => {
    getAllVins()
  })
}

const isEdit = ref(false)

const editVin = function (vin){
  isEdit.value = true
  isOpen.value = true
  formVin.value = vin
  formVin.value.vinId = vin.vinId
}

const addNewVin = function (){
  isOpen.value = true
  isEdit.value = false
  formVin.value = {
    nom:null,
    region:null,
    millesime:null,
    cepage:null,
    annotation:null,
    quatite:null
  }
}

const deleteVin = function (vin){
  fetch(`https://localhost:7110/api/Vin/${vin.vinId}`, {
    method: "delete",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    getAllVins()
  })
}

getAllVins()
</script>