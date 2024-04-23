<template>
  <div class="bg-primary flex flex-col gap-y-6 bg-opacity-10">
    <breadcrumb :pages="pages" class="px-6 lg:px-40 pt-3" />
    <div class="flex justify-between items-center px-6 lg:px-40">
      <div class="flex flex-col gap-y-4">
        <p class="font-redressed text-5xl">{{eventStore.currentEvent.evenementName}}</p>
        <div class="flex flex-col gap-y-1">
          <p>{{eventStore.currentEvent.localisation}}</p>
          <p>{{parseAndFormat(eventStore.currentEvent.dateDebut,"EEEE dd MMMM yyyy HH'h'")}}</p>
        </div>
      </div>
      <div class="cursor-pointer">
        <svg-icon class="text-gray-500" :path="mdiExportVariant" type="mdi" />
      </div>
    </div>
    <div class="flex gap-x-4 overflow-scroll scrollbar-hide h-80 px-6 lg:px-2">
      <img v-for="item in images" :src="item.url" class="rounded-2xl object-cover" alt="image">
    </div>
    <div class="lg:grid flex flex-col gap-y-4 lg:gap-y-0 grid-cols-12 px-6 lg:px-40 lg:my-40">
      <div class="col-span-9 flex flex-col gap-y-6 lg:pr-20">
        <p class="font-redressed text-xl">Description</p>
        <p>Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit Lorem Ipsum dolor eit</p>
      </div>
      <div class="col-span-3 flex flex-col p-6 gap-y-2 rounded-xl bg-white shadow-2xl">
        <p class="font-bold">{{eventStore.currentEvent.prix}} € / persone</p>
        <input v-model="email" type="email" class="rounded-2xl border-gray-400 border pl-4 py-2" placeholder="Adresse e-mail">
        <div @click="signInEvent()" class="bg-primary w-full rounded-2xl text-center py-2 cursor-pointer text-white">
          S'inscrire
        </div>
      </div>
    </div>
    <div class="bg-primary">
      <div class="px-6 lg:px-40 pb-10 flex flex-col gap-y-4 pt-4">
        <p class="text-4xl font-redressed text-white text-center">Autre dates</p>
        <div class="flex flex-col gap-y-4">
          <div v-for="item in event" class="grid gap-x-4 grid-cols-12 bg-white rounded-xl">
            <div class="col-span-5">
              <img src="/_nuxt/assets/images/degust1.png" alt="image" class="lg:h-60 h-48 w-full object-cover rounded-l-xl">
            </div>
            <div class="col-span-7 flex flex-col py-6 pr-6 relative">
              <p>{{item.evenementName}}</p>
              <p>{{item.localisation}}</p>
              <p>Du {{parseAndFormat(item.dateDebut, "dd MMMM")}} au {{parseAndFormat(item.dateFin, "dd MMMM")}}</p>
              <div class="absolute bottom-6 flex justify-between items-center w-full pr-6">
                <p>{{item.prix}} € / personne</p>
                <div @click="setEventInStore(item)" class="bg-primary rounded-2xl text-center py-2 lg:px-8 px-4 cursor-pointer text-white">
                  Voir
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div aria-live="assertive" class="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg-icon type="mdi" :path="verifMail ? mdiCheckCircleOutline : mdiCloseCircleOutline" :class="verifMail ? 'text-green-400' : 'text-red-500'" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">{{verifMail ? "Inscription validé" : "Erreur lors de l'inscription"}}</p>
                  <p class="mt-1 text-sm text-gray-500">{{verifMail ? "Suivez les indications reçu par mail" : "Nous n'avons pas pu vous inscrire à l'évenement"}}</p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button type="button" @click="show = false" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span class="sr-only">Close</span>
                    <svg-icon type="mdi" :path="mdiClose" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from "~/components/breadcrumb.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiExportVariant, mdiClose,mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import {useEventStore} from "~/stores/event";
import {format, parse} from "date-fns";
import {fr} from "date-fns/locale/fr";
const router = useRouter()

const eventStore = useEventStore()

const event = ref(null)
const allEvents = ref(null)

const email = ref("")

const show = ref(false)
const verifMail = ref(false)

const loadEvent = function (){
  event.value = allEvents.value.filter(x => x.atelierId == eventStore.currentEvent.atelierId && x.evenementId != eventStore.currentEvent.evenementId)
}

if(eventStore.currentEvent == null){
  router.push("/")
} else {
  fetch("https://localhost:7110/api/Evenement", {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    allEvents.value = await result.json()
    event.value = allEvents.value.filter(x => x.atelierId == eventStore.currentEvent.atelierId && x.evenementId != eventStore.currentEvent.evenementId)
  })
}

const images = ref([
  {
    url:"/_nuxt/assets/images/degust1.png"
  },
  {
    url:"/_nuxt/assets/images/degust2.png"
  },
  {
    url:"/_nuxt/assets/images/degust3.png"
  },
  {
    url:"/_nuxt/assets/images/degust1.png"
  },
  {
    url:"/_nuxt/assets/images/degust2.png"
  },
  {
    url:"/_nuxt/assets/images/degust3.png"
  }
])

const otherDates = ref([
  {
    img:"/_nuxt/assets/images/degust1.png",
    location : "Rhône Lyon, France",
    date: "Samedi 15 juin",
    price: "55"
  },
  {
    img:"/_nuxt/assets/images/degust1.png",
    location : "Rhône Lyon, France",
    date: "Samedi 15 juin",
    price: "55"
  },
  {
    img:"/_nuxt/assets/images/degust1.png",
    location : "Rhône Lyon, France",
    date: "Samedi 15 juin",
    price: "55"
  }
])

const pages = [
  { name: 'Evenement dégustation', href: '/event' },
]

const parseAndFormat = function(date, formatWish){
  return format(parse(date, "dd/MM/yyyy", new Date()), formatWish, {
    locale: fr,
  })
}

const setEventInStore = function (event){
  eventStore.currentEvent = event
  loadEvent()
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const signInEvent = function (){
  const formData = new FormData();
  const htmlContent = "<div style=\"max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\n" +
      "  <h1 style=\"text-align: center;\">Confirmation d'inscription à " + eventStore.currentEvent.evenementName + "</h1>\n" +
      "  \n" +
      "  <p style=\"text-align: center;\">Merci pour votre inscription à notre événement de dégustation de vin. Voici un récapitulatif de vos informations :</p>\n" +
      "  \n" +
      "  <ul>\n" +
      "    <li><strong>Adresse e-mail :</strong> " + email.value + "</li>\n" +
      "  </ul>\n" +
      "  \n" +
      "  <div style=\"background-color: #f9f9f9; padding: 10px; border-radius: 4px;\">\n" +
      "    <p><strong>Information de paiement :</strong></p>\n" +
      "    <p>Veuillez effectuer le paiement de votre inscription à l'événement en utilisant les informations suivantes :</p>\n" +
      "    <p><strong>Montant : </strong>" + eventStore.currentEvent.prix + "€</p>\n" +
      "    <p><strong>Mode de paiement :</strong> Paylib (06 XX XX XX XX)</p>\n" +
      "  </div>\n" +
      "</div>"
  formData.append('EmailsTo', email.value);
  formData.append('Subject', `Inscription à ${eventStore.currentEvent.evenementName}`);
  formData.append('HtmlContent', htmlContent);
  fetch("https://localhost:7110/api/Mail", {
    method: "post",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData
  }).then((result) => {
    if(result.ok){
      verifMail.value = true
    } else {
      verifMail.value = false
    }
    show.value = true
    email.value = ""
  })
}
</script>