<template>
  <header class="bg-white border-gray-200 border-b">
    <nav class="flex items-center justify-between p-6 lg:px-40" aria-label="Global">
      <div class="flex lg:flex-1">
        <nuxt-link to="/" class="-m-1.5 p-1.5">
          <img class="h-8 w-auto" src="../assets/images/logoText.svg" alt="logo" />
        </nuxt-link>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <svg-icon :path="mdiMenu" type="mdi" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a v-for="item in navigation" :key="item.name" :href="item.to" :class="isConnected ? '' : item.admin ? 'hidden' : '' " class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <nuxt-link to="/gestion-admin" class="text-sm font-semibold leading-6 text-gray-900">
          <svg-icon class="cursor-pointer" v-if="isConnected" :path="mdiAccountCircle" type="mdi" />
        </nuxt-link>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <nuxt-link to="/" class="-m-1.5 p-1.5">
            <img class="h-8 w-auto" src="../assets/images/logoText.svg" alt="logo" />
          </nuxt-link>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <svg-icon :path="mdiClose" type="mdi" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.to" :class="isConnected ? '' : item.admin ? 'hidden' : '' " class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
            </div>
            <div class="py-6">
              <nuxt-link to="/gestion-admin" class="text-sm font-semibold">
                <svg-icon class="cursor-pointer" v-if="isConnected" :path="mdiAccountCircle" type="mdi" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenu, mdiClose, mdiAccountCircle } from '@mdi/js';

const navigation = [
  { name: 'Atelier', to: 'liste-atelier', admin: false },
  { name: 'Calendrier', to: 'calendrier', admin: true},
  { name: 'Stock', to: 'stock', admin: true },
  { name: 'Réservation', to: 'reservation',admin: true },
]

const isConnected = !!localStorage.getItem("accessToken")

const mobileMenuOpen = ref(false)
</script>