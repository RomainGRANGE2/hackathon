<template>
  <div>
    <Header v-if="route.path != '/admin'" />
    <NuxtPage />
    <Footer v-if="route.path != '/admin'" />
  </div>
</template>
<script setup lang="ts">
import Header from "~/components/Header.vue";
import {useRoute} from "vue-router";
const route = useRoute()

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Redressed&display=swap" }
  ],
});
</script>