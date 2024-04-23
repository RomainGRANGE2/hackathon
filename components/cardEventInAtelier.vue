<template>
  <div class="flex flex-col rounded-xl">
    <div>
      <img src="/_nuxt/assets/images/degust2.png" alt="image">
    </div>
    <div class="bg-primary bg-opacity-10 p-4 rounded-b-xl">
      <p>{{props.data.evenementName}}</p>
      <p>{{props.data.localisation}}</p>
      <p>{{props.data.date}}</p>
      <div class="flex justify-between items-center">
        <p>{{props.data.prix}} € / personne</p>
        <nuxt-link to="/event" @click="setEventInStore()" class="bg-primary rounded-2xl text-center py-2 lg:px-8 px-4 cursor-pointer text-white">
          Voir
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useEventStore} from "~/stores/event.js";

const props = defineProps({
  data: {type: Object, required: true}
})

const eventStore = useEventStore()

const setEventInStore = function (){
  eventStore.currentEvent = props.data
}
</script>