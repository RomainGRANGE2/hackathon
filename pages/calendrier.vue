<template>
  <div class="h-screen mx-9 mb-8 calendar-container is-light-mode">
    <Qalendar
      v-if="events.length > 0"
      :events="events"
      :config="config"
    />
  </div>
</template>

<script>
import { Qalendar } from "qalendar";
import moment from 'moment';

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      events: [],
      config: {
        locale: "fr-FR",
        defaultMode: "month",
        dayBoundaries: {
          start: 6,
          end: 3,
        },
      },
    };
  },

  created() {
    this.loadEvents();
  },

  methods: {
    async loadEvents() {
      fetch("https://localhost:7110/api/Evenement", {
        method: "get",
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(async(result) => {
        const eventResult = await result.json()
        for (const event of eventResult) {
          this.events.push(
            {
              title: event.evenementName,
              time: { start: moment(event.dateDebut, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm'), end: moment(event.dateFin, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') },
              isEditable: true,
              location: event.localisation,
              id: event.evenementId,
            }
          );
        }
      });
    },
  },
};
</script>

<style>
  @import "qalendar/dist/style.css";
</style>