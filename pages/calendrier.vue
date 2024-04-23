<template>
  <div class="h-screen mx-9 mb-8">
    <Qalendar
      :events="events"
      :config="config"
    />
  </div>
</template>

<script>
import { Qalendar } from "qalendar";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      events: [
        // ...
        {
          title: "Advanced algebra",
          with: "Chandler Bing",
          time: { start: "2022-05-16 12:05", end: "2022-05-16 13:35" },
          color: "yellow",
          isEditable: true,
          id: "753944708f0f",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
        },
        {
          title: "Ralph on holiday",
          with: "Rachel Greene",
          time: { start: "2024-04-23 12:05", end: "2024-04-26 13:35" },
          color: "green",
          isEditable: true,
          id: "5602b6f589fc"
        }
      ],
      config: {
        locale: "eu",
        defaultMode: "month",
        dayBoundaries: {
          start: 6,
          end: 3,
        },
      }
    }
  },
}
</script>

<style>
@import "qalendar/dist/style.css";
</style>