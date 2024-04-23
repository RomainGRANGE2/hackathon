<template>
  <div class="flex flex-col rounded-xl">
    <div>
      <img :src="props.data.img" alt="image">
    </div>
    <div class="bg-primary bg-opacity-10 p-4 rounded-b-xl">
      <p>{{props.data.name}}</p>
      <p>{{props.data.localisation}}</p>
      <p>{{props.data.date}}</p>
      <div class="flex justify-between items-center">
        <p>{{props.data.prix}} € / personne</p>
        <div class="bg-primary rounded-2xl text-center py-2 lg:px-8 px-4 cursor-pointer text-white">
          Voir
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {type: Object, required: true}
})
</script>