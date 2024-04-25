<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex space-x-4 rounded-md bgwhite">
      <li class="flex">
        <div class="flex items-center">
          <nuxt-link to="/">
            <svg-icon :path="mdiHome" type="mdi" />
            <span class="sr-only">Home</span>
          </nuxt-link>
        </div>
      </li>
      <li v-for="page in props.pages" :key="page.name" class="flex">
        <div class="flex items-center">
          <svg class="h-full flex-shrink-0 text-black" width="12" height="22" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <nuxt-link :to="page.href" class="ml-4 text-sm font-medium">{{ page.name }}</nuxt-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHome } from '@mdi/js';

const props = defineProps({
  pages: {type: Array, required: true}
})
</script>