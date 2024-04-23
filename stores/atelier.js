import { defineStore } from 'pinia'

export const useAtelierStore = defineStore('atelier', () => {

    const currentAtelier = ref(null)

    return { currentAtelier }
})
