<template>
  <div class="event-list-container">
    <h1 class="event-list-title"><RouterLink to="/">Ker</RouterLink></h1>

    <div class="event-section">
      <h2 class="section-title">J'organise</h2>
      <div v-if="loading">Chargement des événements...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="userStore.eventsCreated.length === 0">Tu n'as pas encore créé d'événements.</div>
        <div v-else>
          <div v-for="event in userStore.eventsCreated" :key="event.id" class="event-item">
            <RouterLink :to="{ name: 'EventDetails', params: { id: event.id } }">
              <span class="event-name">{{ event.title }}</span>
              <span class="event-arrow">→</span>
            </RouterLink>
          </div>
        </div>

        <h2 class="section-title">Je participe</h2>
        <div v-if="userStore.eventsInvited.length === 0">Tu n'as pas encore été invité à des événements.</div>
        <div v-else>
          <div v-for="event in userStore.eventsInvited" :key="event.id" class="event-item">
            <RouterLink :to="{ name: 'EventDetails', params: { id: event.id } }">
              <span class="event-name">{{ event.title }}</span>
              <span class="event-arrow">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup >
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../stores/userStore';

  const guestToken = ref('');
  const loading = ref(true);
  const error = ref(null);
  const userStore = useUserStore();
  const API_URL = import.meta.env.DEV  
    ? 'http://localhost:3000'
    : import.meta.env.VITE_API_URL;

  const fetchEvents = async () => {
    try {
      
      const response = await fetch(`${API_URL}/api/events/listEvents/${userStore.email}`);
      
      if (!response.ok) {
        throw new Error('Erreur HTTP');
      }
      const data = await response.json();
      
      userStore.updateEventsCreated(data.eventsCreated || []);
      userStore.updateEventsInvited(data.eventsInvited || []);
      
      userStore.updateToken(data.userToken || '');
      userStore.updateName(data.name || '');
      guestToken.value = data.guestToken || '';
    } catch (err) {
      error.value = 'Erreur lors de la récupération des événements.';
    } finally {
      loading.value = false;
    }
  };

  // Appel API lors du montage du composant
  onMounted(() => {
    fetchEvents();
  });
</script>

<style scoped>
/* Tes styles ici */
.event-list-title {
  font-size: 24px;
  font-weight: bold;
}

.section-title {
  font-size: 18px;
  margin-top: 20px;
}

.event-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.tokens-info {
  margin-top: 20px;
}
</style>
