<template>
  <footer class="bg-white">
    <div class="p-6 lg:px-40 flex items-center justify-between">
      <div class="md:mt-0 flex items-center gap-2">
        <p class="text-center text-xs text-gray-500">Copyright &copy; 2024 VinVine Inc. All rights reserved.</p>
      </div>
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <svg-icon :path="item.icon" type="mdi" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLinkedin } from '@mdi/js';
const navigation = [
  {
    name: "Linkedin",
    icon : mdiLinkedin,
    href : "https://www.linkedin.com/in/olivier-bonneton-5a320020/"
  }
]
</script>