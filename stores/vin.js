import { defineStore } from 'pinia'

export const useVinStore = defineStore('vin', () => {

    const currentVin = ref(null)

    const getVin = async (vinId) => {
        try {
            const response = await fetch(`https://localhost:7110/api/Vin/${vinId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
                }
            })

            currentVin.value = await response.json();

        } catch (error) {
            console.error('Error fetching VIN:', error)
        }
    }
    
    return { currentVin, getVin }
})
