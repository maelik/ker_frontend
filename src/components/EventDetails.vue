<!-- src/views/EventDetails.vue -->
<template>
    <div class="event-details-container">
        <div v-if="loadingEvent || loadingFavoriteDate">Chargement des données...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
          <EventSummary :event="event.event" :view="event.view" :favoriteDate="favoriteDate"/>
          <nav class="event-tabs">
            <router-link :to="{ name: 'EventInfo' }" class="tab" active-class="active">Infos</router-link>
            <router-link :to="{ name: 'EventParticipants'}" class="tab" active-class="active">Participants</router-link>
            <router-link :to="{ name: 'EventListPost' }" class="tab" active-class="active">Discussions</router-link>
            <router-link :to="{ name: 'EventTricount' }" class="tab" active-class="active">Tricount</router-link>
          </nav>
          <router-view :event="event"></router-view>
        </div>
    </div>
  </template>
  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useUserStore } from '../stores/userStore';
    import EventSummary from './EventSummary.vue';

    const route = useRoute();
    const event = ref({});
    const userStore = useUserStore();
    const loadingEvent = ref(true);
    const loadingFavoriteDate = ref(true);
    const error = ref(null);
    const favoriteDate = ref({});
    
          
  
    const fetchEventDetails = async () => {
        
      try {
        let apiUrl = `${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/infoEvent`;

        // Vérifiez si l'utilisateur a créé cet événement
        const isEventCreatedByUser = userStore.eventsCreated.some(event => String(event.id) === String(route.params.id));
        

        // Si l'utilisateur a créé cet événement, ajoutez le token à l'URL
        if (isEventCreatedByUser) {
          apiUrl += `/${userStore.token}`;
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erreur HTTP');
        }
        event.value = await response.json();
        
      } catch (err) {
        error.value = 'Erreur lors de la récupération des détails de l\'événement.';
        console.error(err);
      } finally {
        loadingEvent.value = false;
      }
    };

    const fetchDateFavorite = async () => {
      try {
        let apiUrl = `${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/favoriteDate`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erreur HTTP');
        }
        favoriteDate.value = await response.json();
        
      } catch (err) {
        error.value = 'Erreur lors de la récupération des détails de l\'événement.';
        console.error(err);
      } finally {
        loadingFavoriteDate.value = false;
      }
    };
  
    onMounted(() => {
      fetchEventDetails();
      fetchDateFavorite();
    });

  </script>
  
  <style scoped>

  .event-tabs {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }

  .tab {
    padding: 10px;
    border-bottom: 2px solid transparent;
    text-decoration: none;
    color: black;
  }

  .tab:hover {
    background-color: #f0f0f0;
  }

  .active {
    color: blue; /* Couleur de l'onglet actif */
    border-bottom: 2px solid blue; /* Exemple de style pour l'onglet actif */
  }
  </style>
  