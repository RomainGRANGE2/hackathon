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
        <div v-if="atelierSelected != null || newAtelier" class="flex flex-col gap-y-4">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <p>{{newAtelier ? "Créer un atelier" : "Infos de l'atelier"}}</p>
              <svg-icon :path="open ? mdiChevronDown : mdiChevronUp" type="mdi" />
            </DisclosureButton>
            <DisclosurePanel>
              <div class="isolate">
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
                      <input type="file" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <div class="sm:col-span-2">
                      <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Image</label>
                      <div class="mt-2.5">
                        <input id="imageFile" type="file" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                    <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{newAtelier ? "Créer" : "Modifier"}}</button>
                  </div>
                  <div class="mt-2" v-if="!newAtelier">
                    <div @click="deleteAtelier()" class="cursor-pointer block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Supprimer</div>
                  </div>
                </form>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure v-if="!newAtelier" v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <p>Evenement attachés à cet atelier</p>
              <svg-icon :path="open ? mdiChevronDown : mdiChevronUp" type="mdi" />
            </DisclosureButton>
            <DisclosurePanel class="grid grid-cols-12 gap-4">
              <card-event-in-atelier @getEvent="getEventByAtelierId()" modif class="col-span-6" v-for="item in allAEventByAtelierId" :data="item"></card-event-in-atelier>
              <div @click="openFormNewEvent()" :class="allAEventByAtelierId.length == 0 ? 'h-[260px]' : ''" class="col-span-6 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center cursor-pointer">
                <svg-icon size="60" :path="mdiFolderPlusOutline" type="mdi" />
              </div>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure v-if="newAtelier" v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <p>Créer une école</p>
              <svg-icon :path="open ? mdiChevronDown : mdiChevronUp" type="mdi" />
            </DisclosureButton>
            <DisclosurePanel>
              <form @submit.prevent="validFormEcole()">
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-semibold leading-6 text-gray-900">Nom</label>
                    <div class="mt-2.5">
                      <input v-model="formEcole.ecoleName" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                  <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Créer</button>
                </div>
              </form>
            </DisclosurePanel>
          </Disclosure>

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
                  Créer un évènement
                </DialogTitle>
                <div class="isolate">
                  <form @submit.prevent="validFormEvent()">
                    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div>
                        <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nom</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.evenementName" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Date début</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.dateDebut" required type="date" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Date Fin</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.dateFin" required type="date" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Date Limite</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.dateLimit" required type="date" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Localisation</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.localisation" required type="text" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Nombre participant</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.nombreParticipant" required type="number" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Nombre dégustation</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.nombreDegustation" required type="number" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Prix</label>
                        <div class="mt-2.5">
                          <input v-model="formEvent.prix" required type="number" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Ecole</label>
                        <div class="mt-2.5 flex items-center gap-x-1">
                          <select v-model="formEvent.ecoleId" class="w-full">
                            <option v-for="item in allEcoles" :value="item.ecoleId">{{item.ecoleName}}</option>
                          </select>
                          <svg-icon @click="formEvent.ecoleId = null" class="cursor-pointer text-black" :path="mdiClose" type="mdi" />
                        </div>
                      </div>
                      <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Atelier</label>
                        <div class="mt-2.5">
                          <select v-model="formEvent.atelierId" class="w-full">
                            <option v-for="item in allAteliers" :value="item.atelierId">{{item.atelierName}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="sm:col-span-2">
                        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Image</label>
                        <div class="mt-2.5">
                          <input id="imageFile" type="file" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div class="sm:col-span-2">
                        <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                        <div class="mt-2.5">
                          <textarea v-model="formEvent.description" rows="4" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div class="mt-10">
                      <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Créer</button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiNewBox, mdiChevronDown, mdiChevronUp, mdiFolderPlusOutline, mdiClose} from '@mdi/js';
import {
  Dialog,
  DialogPanel, DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
const router = useRouter()

const isConnected = !!localStorage.getItem("accessToken")

if(!isConnected){
  router.push("/")
}

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

const formEvent = ref({
  evenementName: null,
  description: null,
  dateDebut: null,
  dateFin: null,
  dateLimit: null,
  localisation: null,
  nombreParticipant: null,
  nombreDegustation: null,
  imageFiles: [],
  prix: null,
  ecoleId: null,
  atelierId: null
})

const formEcole = ref({
  ecoleName: null
})

const isOpen = ref(false)

const closeModal = function (){
  isOpen.value = false
}

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


const allAEventByAtelierId = ref(null)

const getEventByAtelierId = function (){
  fetch(`https://localhost:7110/api/Atelier/${atelierSelected.value.atelierId}/Evenement`, {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    const eventResult = await result.json()
    console.log(eventResult)
    allAEventByAtelierId.value = eventResult
  })
}

getAllAtelelier()

const setSelectAtelier = function (atelier){
  atelierSelected.value = atelier
  newAtelier.value = false
  formAtelier.value = {
    atelierId: atelier.atelierId,
    atelierName: atelier.atelierName,
    date: atelier.date,
    ressource: atelier.ressource,
    imageFiles: atelier.images,
    thematique: atelier.thematique,
    description: atelier.description
  }
  getEventByAtelierId()
}

const addAtelier = function (){
  newAtelier.value = true
  formAtelier.value = {
    atelierName: null,
    Description: null,
    thematique: null,
    date: null,
    ressource: null,
    imageFiles: []
  }
}

const validFormAtelier = function (){

  const url = newAtelier.value ? "https://localhost:7110/api/Atelier" : `https://localhost:7110/api/Atelier/${atelierSelected.value.atelierId}`
  const formData = new FormData();
  formData.append("AtelierName",formAtelier.value.atelierName)
  formData.append("Description",formAtelier.value.description)
  formData.append("Thematique",formAtelier.value.thematique)
  formData.append("Date",formAtelier.value.date)
  formData.append("Ressource",formAtelier.value.ressource)
  formData.append("ImageFiles",formAtelier.value.imageFiles)

  const headers = newAtelier.value ? {
    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
  } :
  {
    "Content-type" : "application/json",
    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
  }

  fetch(url, {
    method: newAtelier.value ? "post" : "put",
    headers: headers,
    body: newAtelier.value ? formData : JSON.stringify(formAtelier.value)
  }).then(async(result) => {
    getAllAtelelier()
  })
}

const allAteliers = ref([])

const allEcoles = ref([])

const getAllAteliers = function (){
  fetch(`https://localhost:7110/api/Atelier`, {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    const atelierResult = await result.json()
    allAteliers.value = atelierResult
  })
}

const getAllEcole = function (){
  fetch(`https://localhost:7110/api/Ecole`, {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    const ecoleResult = await result.json()
    allEcoles.value = ecoleResult
  })
}

getAllAteliers()
getAllEcole()

const deleteAtelier = function (){
  fetch(`https://localhost:7110/api/Atelier/${atelierSelected.value.atelierId}`, {
    method: "delete",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(formAtelier.value)
  }).then(async(result) => {
    getAllAtelelier()
    atelierSelected.value = null
  })
}

const validFormEvent = function (){
  console.log(formEvent.value)

  const formData = new FormData();
  formData.append("EvenementName",formEvent.value.evenementName)
  formData.append("Description",formEvent.value.description)
  formData.append("DateDebut",formEvent.value.dateDebut)
  formData.append("DateFin",formEvent.value.dateFin)
  formData.append("DateLimit",formEvent.value.dateLimit)
  formData.append("Localisation",formEvent.value.localisation)
  formData.append("NombreParticipant",formEvent.value.nombreParticipant)
  formData.append("NombreDegustation",formEvent.value.nombreDegustation)
  formData.append("ImageFiles",formEvent.value.imageFiles)
  formData.append("Prix",formEvent.value.prix)
  if(formEvent.value.ecoleId != null){
    formData.append("EcoleId",formEvent.value.ecoleId)
  }
  formData.append("AtelierId",formEvent.value.atelierId)

  fetch(`https://localhost:7110/api/Evenement`, {
    method: "post",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData
  }).then(async(result) => {
    isOpen.value = false
    getEventByAtelierId()
  })
}


const openFormNewEvent = function (){
  isOpen.value = true
  formEvent.value.atelierId = atelierSelected.value.atelierId
}

const validFormEcole = function (){
  fetch(`https://localhost:7110/api/Ecole`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(formEcole.value)
  }).then(async(result) => {

  })
}

const handleCustomEvent = (data) => {
  console.log(atelierSelected.value.ressource);
  atelierSelected.value.ressource = data;
}
</script>
