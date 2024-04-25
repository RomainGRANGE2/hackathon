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
        <div @click="finishEvent()" class="p-2 px-4 bg-green-600 cursor-pointer rounded-md text-white">
          Evenement terminé
        </div>
      </div>
    </div>
    <div class="flex gap-x-4 overflow-scroll scrollbar-hide h-80 px-6 lg:px-2">
      <img v-for="item in images" :src="item.url" class="rounded-2xl object-cover" alt="image">
    </div>
    <div class="lg:grid flex flex-col gap-y-4 lg:gap-y-0 grid-cols-12 px-6 lg:px-40 lg:my-10">
      <div class="col-span-9 flex flex-col gap-y-6 lg:pr-20">
        <p class="font-redressed text-xl">Description</p>
        <p>{{eventStore.currentEvent.description}}</p>
      </div>
      <div class="col-span-3 flex flex-col p-6 gap-y-2 rounded-xl bg-white shadow-xl">
        <p class="font-bold">{{eventStore.currentEvent.prix}} € / personne</p>
        <input v-model="email" type="email" class="rounded-2xl border-gray-400 border pl-4 py-2" placeholder="Adresse e-mail">
        <div class="flex flex-col gap-y-2">
          <p class="text-xs">Si vous êtes étudiant séléctioné votre école</p>
          <select v-model="ecole">
            <option v-for="item in allEcoles" :value="item.ecoleId">{{item.ecoleName}}</option>
          </select>
        </div>
        <div @click="signInEvent()" class="bg-primary w-full rounded-2xl text-center py-2 cursor-pointer text-white">
          S'inscrire
        </div>
      </div>
    </div>
    <div v-if="isConnected" class="bg-white m-5 rounded-2xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <p class="text-base font-semibold leading-6 text-gray-900">Participants</p>
        <div class="flex items-center gap-x-4">
          <p class="text-2xl"><span class="text-primary font-bold">{{nbParticipants}}</span> / {{eventStore.currentEvent.nombreParticipant}}</p>
          <div @click="sendMaillAll()" class="bg-green-600 p-2 rounded-lg text-white cursor-pointer" v-if="nbParticipants == eventStore.currentEvent.nombreParticipant">
            Envoyer le rappel
          </div>
        </div>
      </div>
      <div class="mt-5 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nom de l'école</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" class="relative pr-4 py-3.5 text-right text-sm font-semibold text-gray-900 sm:pr-0">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in visitors" :key="person.visiteur.visiteurId">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-start">
                    <div class="  ">
                      <div class="font-medium text-gray-900">{{ person.visiteur.email }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span v-if="person.visiteur.ecoleId == null">Pas d'école</span>
                  <span v-else>{{person.visiteur.ecole.ecoleName}}</span>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <span v-if="person.status == 0" class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">En attente</span>
                  <span v-else-if="person.status == 1" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Inscrit</span>
                  <span v-else class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Refusé</span>
                </td>
                <td class="flex gap-x-2 justify-end relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button v-if="person.status != 1" @click="setStatusToPaid(person)" class="text-white bg-green-500 py-2 px-4 rounded-3xl hover:text-green-500 hover:bg-white hover:border-green-500 border transition-all duration-300"
                  >À payer</button>
                  <button v-if="person.status != 2" @click="setStatusToRefus(person)" class="text-white bg-primary py-2 px-4 rounded-3xl hover:text-primary hover:bg-white hover:border-primary border transition-all duration-300"
                  >Refuser</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-primary">
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
    <TransitionRoot appear :show="errorNbParticipant" as="template">
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
                    class="text-lg font-medium leading-6 text-gray-900 flex items-center gap-x-2"
                >
                  <svg-icon size="30" type="mdi" :path="mdiClose" class="text-red-500 rounded-full border border-red-500 p-1" />
                  Nombre de participants maximum atteint
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Le nombre maximum de participant à cet évenement a été ateint
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from "~/components/breadcrumb.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiExportVariant, mdiClose,mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import {useEventStore} from "~/stores/event";
import {format, parse} from "date-fns";
import {fr} from "date-fns/locale/fr";
import {DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Dialog} from "@headlessui/vue";

const router = useRouter()

const eventStore = useEventStore()

const event = ref(null)
const allEvents = ref(null)

const email = ref("")
const ecole = ref(null)

const show = ref(false)
const verifMail = ref(false)

const errorNbParticipant = ref(false)

const closeModal = function (){
  errorNbParticipant.value = false
}

const loadEvent = function (){
  event.value = allEvents.value.filter(x => x.atelierId == eventStore.currentEvent.atelierId && x.evenementId != eventStore.currentEvent.evenementId)
}

const isConnected = !!localStorage.getItem("accessToken")

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

const visitors = ref([]);

const pages = [
  { name: 'Evenement dégustation', href: '/event' },
]

const allEcoles = ref([])

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

getAllEcole()

const parseAndFormat = function(date, formatWish){
  return format(parse(date, "yyyy-MM-dd'T'HH:mm", new Date()), formatWish, {
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

      const url =
          ecole.value != null ? `https://localhost:7110/api/EvenementVisiteur?email=${email.value}&evenementId=${eventStore.currentEvent.evenementId}&ecoleId=${ecole.value}`:
          `https://localhost:7110/api/EvenementVisiteur?email=${email.value}&evenementId=${eventStore.currentEvent.evenementId}`

      fetch(url, {
        method: "post",
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
        },
      }).then((result) => {
        getAllVisiteurByEvenement()
      })

    } else {
      verifMail.value = false
    }
    show.value = true
    email.value = ""
  })
}

const nbParticipants = ref(null)

const getAllVisiteurByEvenement = function (){
  fetch(`https://localhost:7110/api/EvenementVisiteur/${eventStore.currentEvent.evenementId}`, {
    method: "get",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
  }).then(async(result) => {
    const EventVisiteurResult = await result.json()
    visitors.value = EventVisiteurResult
    nbParticipants.value = EventVisiteurResult.filter(x => x.status == 1).length
  })
}

const setStatusToPaid = function (person){

  const visiteurId = person.visiteurId

  const isFull = nbParticipants.value == eventStore.currentEvent.nombreParticipant

  if(!isFull){
    fetch(`https://localhost:7110/api/EvenementVisiteur?evenementId=${eventStore.currentEvent.evenementId}&visiteurId=${visiteurId}&status=1`, {
      method: "put",
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
      },
    }).then(async(result) => {
      getAllVisiteurByEvenement()

      const formData = new FormData();
      const htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n" +
          "    <h1 style=\"color: #333333;\">Confirmation de participation</h1>\n" +
          "    <p>Bonjour,</p>\n" +
          "    <p>Nous avons le plaisir de vous informer que votre demande de participation à l'événement a été acceptée.</p>\n" +
          "    <p><strong>Événement:</strong> " + eventStore.currentEvent.evenementName + " </p>\n" +
          "    <p><strong>Date de l'événement:</strong>" + parseAndFormat(eventStore.currentEvent.dateDebut,"EEEE dd MMMM yyyy") + "</p>\n" +
          "    <p>Nous espérons vous voir bientôt parmi nous.</p>\n" +
          "  </div>"
      formData.append('EmailsTo', person.visiteur.email);
      formData.append('Subject', `Confirmation d'inscription à ${eventStore.currentEvent.evenementName}`);
      formData.append('HtmlContent', htmlContent);
      fetch("https://localhost:7110/api/Mail", {
        method: "post",
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
      })
    })
  } else {
    errorNbParticipant.value = true
  }
}

const setStatusToRefus = function (person){

  const visiteurId = person.visiteurId

  fetch(`https://localhost:7110/api/EvenementVisiteur?evenementId=${eventStore.currentEvent.evenementId}&visiteurId=${visiteurId}&status=2`, {
    method: "put",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
  }).then(async(result) => {
    getAllVisiteurByEvenement()
  })
}

const sendMaillAll = function (){
  const formData = new FormData()

  const htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n" +
      "    <h1 style=\"color: #333333;\">Confirmation de participation</h1>\n" +
      "    <p>Bonjour,</p>\n" +
      "    <p>Rappel pour votre évenement du " + parseAndFormat(eventStore.currentEvent.dateDebut,"EEEE dd MMMM yyyy") + "</p>\n" +
      "  </div>"

  visitors.value.filter(x => x.status == 1).map(x => x.visiteur.email).forEach(x => formData.append("EmailsTo",x))
  formData.append("Subject",`Rappel de votre Évenement : ${eventStore.currentEvent.evenementName}`)
  formData.append("HtmlContent",htmlContent)

  fetch("https://localhost:7110/api/Mail", {
    method: "post",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData
  })
}

function base64ToBlob(base64, mimeType) {
  const base64WithoutPrefix = base64.replace(/^data:[a-z]+\/[a-z]+;base64,/, '');
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

const finishEvent = function (){
  const formData = new FormData()

  const htmlContent = "TERMINE"

  visitors.value.filter(x => x.status == 1).map(x => x.visiteur.email).forEach(x => formData.append("EmailsTo",x))
  formData.append("Subject",`Evenement terminé : ${eventStore.currentEvent.evenementName}`)
  formData.append("HtmlContent",htmlContent)
  const pdfBlob = base64ToBlob(eventStore.currentEvent.atelier.ressource, 'application/pdf');
  formData.append('Attachment', pdfBlob, `${eventStore.currentEvent.evenementName}.pdf`);

  fetch("https://localhost:7110/api/Mail", {
    method: "post",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData
  })
}

getAllVisiteurByEvenement()

</script>