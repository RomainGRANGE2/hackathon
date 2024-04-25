import { defineStore } from 'pinia'

export const useEcoleStore = defineStore('ecole', () => {

    const currentEcole = ref(null)

    return { currentEcole }
})
