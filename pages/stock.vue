<template>
  <div class="px-6 lg:px-40">
    <p class="text-center font-redressed text-2xl">Liste de vos vins</p>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3" v-for="item in allVins">

      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()

const isConnected = !!localStorage.getItem("accessToken")

if(!isConnected){
  router.push("/")
}

const allVins = ref([])

const getAllVins = function (){
  fetch("https://localhost:7110/api/Vin", {
    method: "get",
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).then(async(result) => {
    const vinsResult = await result.json()
    allVins.value = vinsResult
  })
}

getAllVins()
</script>