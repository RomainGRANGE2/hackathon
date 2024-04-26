<template>
  <div class="flex flex-col rounded-xl">
    <div>
      <img :src="props.data.imageEvenement.length > 0 ? 'data:image/png;base64,'+props.data.imageEvenement[props.data.imageEvenement.length-1].data : '/_nuxt/assets/images/degust1.png'" alt="image" class="rounded-t-xl object-cover h-[180px] w-full">
    </div>
    <div class="bg-primary bg-opacity-10 p-4 rounded-b-xl">
      <div class="flex justify-between items-center">
        <p>{{props.data.evenementName}}</p>
        <svg-icon class="cursor-pointer" v-if="props.modif" @click="openDialogFormEvent()" type="mdi" :path="mdiPencil" />
      </div>
      <p>{{props.data.localisation}}</p>
      <p>{{props.data.date}}</p>
      <div class="flex justify-between items-center">
        <p>{{props.data.prix}} € / personne</p>
        <nuxt-link to="/event" @click="setEventInStore()" class="bg-primary rounded-2xl text-center py-2 lg:px-8 px-4 cursor-pointer text-white">
          Voir
        </nuxt-link>
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
                  Modification d'évènement
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
                        <input v-model="formEvent.dateDebut" required type="datetime-local" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Date Fin</label>
                      <div class="mt-2.5">
                        <input v-model="formEvent.dateFin" required type="datetime-local" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Date Limite</label>
                      <div class="mt-2.5">
                        <input v-model="formEvent.dateLimit" required type="datetime-local" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                          <option v-for="item in allEcoles" :value="item.id">{{item.EcoleName}}</option>
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
                        <input multiple @change="handleImageChange" type="file" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                    <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Modifier</button>
                  </div>
                  <div class="mt-2">
                    <div @click="deleteEvent()" class="cursor-pointer block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Supprimer</div>
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
import {useEventStore} from "~/stores/event.js";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil,mdiClose } from '@mdi/js'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";

const props = defineProps({
  data: {type: Object, required: true},
  modif: {type: Boolean, required: false, default: false}
})

const emits = defineEmits(['getEvent'])

const files = ref([])

const formEvent = ref({
  evenementName: null,
  description: null,
  dateDebut: null,
  dateFin: null,
  dateLimit: null,
  localisation: null,
  nombreParticipant: null,
  nombreDegustation: null,
  imageEvenement: [],
  prix: null,
  ecoleId: null,
  atelierId: null
})

const isOpen = ref(false)

const closeModal = function (){
  isOpen.value = false
}

const eventStore = useEventStore()

const setEventInStore = function (){
  eventStore.currentEvent = props.data
}

const openDialogFormEvent = function(){
  isOpen.value = true
  formEvent.value = {
    evenementId: props.data.evenementId,
    evenementName: props.data.evenementName,
    description: props.data.description,
    dateDebut: props.data.dateDebut,
    dateFin: props.data.dateFin,
    dateLimit: props.data.dateLimit,
    localisation: props.data.localisation,
    nombreParticipant: props.data.nombreParticipant,
    nombreDegustation: props.data.nombreDegustation,
    imageEvenement: props.data.imageEvenement,
    prix: props.data.prix,
    ecoleId: props.data.ecoleId,
    atelierId: props.data.atelierId
  }

  console.log(props.data)
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

console.log('props',props.data)

const validFormEvent = function (){
  console.log(formEvent.value)

  const formData = new FormData()

  if(files.value.length > 0){
    files.value.forEach(file => {
      formData.append('ImageFiles', file, file.name);
    });
  }

  formData.append("EvenementName",formEvent.value.evenementName)
  formData.append("Description",formEvent.value.description)
  formData.append("DateDebut",formEvent.value.dateDebut)
  formData.append("DateFin",formEvent.value.dateFin)
  formData.append("DateLimit",formEvent.value.dateLimit)
  formData.append("Localisation",formEvent.value.localisation)
  formData.append("NombreParticipant",formEvent.value.nombreParticipant)
  formData.append("NombreDegustation",formEvent.value.nombreDegustation)
  formData.append("Prix",formEvent.value.prix)
  formData.append("AtelierId",formEvent.value.atelierId)
  if(formEvent.value.ecoleId != null){
    formData.append("EcoleId",formEvent.value.ecoleId)
  }


  fetch(`https://localhost:7110/api/Evenement/${props.data.evenementId}`, {
    method: "put",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData
  }).then(async(result) => {
    emits('getEvent')
    isOpen.value = false
  })
}

const deleteEvent = function (){
  fetch(`https://localhost:7110/api/Evenement/${props.data.evenementId}`, {
    method: "delete",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
  }).then(async(result) => {
    isOpen.value = false
    emits('getEvent')
  })
}

const handleImageChange = function (event){
  const target = event.target
  if (target.files) {
    files.value = Array.from(target.files);
  }
}
</script>