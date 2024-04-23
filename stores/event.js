import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', () => {

    const currentEvent = ref(null)

    return { currentEvent }
})
