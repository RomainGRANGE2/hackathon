<template>
  <div>
    <nuxt-link
      @click="setEventInStore()"
      to="/event"
      class="atelier cursor-pointer w-[200px] lg:w-auto !bg-cover h-[390px] rounded-lg flex flex-col gap-y-2 items-center justify-center relative"
    >
      <p class="font-rubik text-3xl text-[#FFAF9D] font-extrabold">
        {{ props.data.evenementName }}
      </p>
      <p class="text-white font-redressed text-lg">
        {{ props.data.nombreDegustation }} dégustations
      </p>
      <p class="absolute bottom-4 text-white font-redressed">{{ date }}</p>
    </nuxt-link>
  </div>
</template>
<script setup>
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale/fr";
import {useEventStore} from "~/stores/event.js";

const eventStore = useEventStore()

const props = defineProps({
  data: { type: Array, required: true },
});

const date = computed(() => {
  return (
    "Du " +
    formatAndParse(props.data.dateDebut) +
    " au " +
    formatAndParse(props.data.dateFin)
  );
});

const formatAndParse = function (date) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd MMMM", {
    locale: fr,
  });
};

const setEventInStore = function (){
  eventStore.currentEvent = props.data
}
</script>
<style>
.atelier {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://media.winalist.com/prod/uploads/5yBG1FkMwvqU.jpg?twic=v1/cover=670x720");
}
.special-text {
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ffaf9d;
}
</style>
