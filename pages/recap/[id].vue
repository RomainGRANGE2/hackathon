<template>
  <div class="px-6 lg:px-40">
    <div class="flex justify-center">
      <p>Récap de {{infoEvent}}</p>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
console.log(route)

const infoEvent = ref(null)

const getInfoEvent = function (){
  fetch(`https://localhost:7110/api/Evenement/${route.params.id}`, {
    method: "get",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    },
  }).then(async(result) => {
    const eventResult = await result.json()
    infoEvent.value = eventResult
  })
}

getInfoEvent()
</script>