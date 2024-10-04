
<template>
    <div class="event-details-container">
        <div v-if="event.view == 'user'">
            <EventInfoUser :event="event.event"/>
        </div>
        <div v-if="event.view == 'guest'">
            <EventInfoGuest :event="event.event"/>
        </div>
    </div>
</template>
  
<script setup>
  import { toRefs } from 'vue';
  import EventInfoUser from './EventInfoUser.vue';
  import EventInfoGuest from './EventInfoGuest.vue';

  // Importation des props
  const props = defineProps({
    event: {
      type: Object,
      required: true
    }
  });

  // Utilisation de `toRefs` pour rendre les propriétés réactives
  const { event } = toRefs(props);

</script>
  
  <style scoped>
  /* Vos styles pour la page de détails */
  </style>
  