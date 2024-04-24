<template>
  <div>
    <p>STOCK</p>
  </div>
</template>
<script setup>
const router = useRouter()

const isConnected = !!localStorage.getItem("accessToken")

if(!isConnected){
  router.push("/")
}
</script>