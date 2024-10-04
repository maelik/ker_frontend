
<template>
    <div class="event-details-container">
      <div v-if="loading">Chargement des données...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="attendees">
          <!-- Peut venir -->
          <div class="section">
            <h3>Peut venir</h3>
            <div v-for="(person, index) in canCome" :key="index" class="card">
              <div class="person-info">
                <div class="person-header">
                  <span class="icon">😊</span>
                  <span class="name">{{ person.guestName }}</span>
                </div>
                <ul class="dates">
                  <li v-for="(response, i) in person.GuestResponses" :key="i">
                    <span v-if="response.response == true">✔️</span> <span v-else>❌</span>{{ response.EventDate.proposed_date }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Ne peut venir -->
          <div class="section">
            <h3>Ne peut venir</h3>
            <div v-for="(person, index) in cannotCome" :key="index" class="card">
              <div class="person-info">
                <div class="person-header">
                  <span class="name">{{ person.guestName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>


  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const loading = ref(true);
    const error = ref(null);
    const canCome = ref({});
    const cannotCome = ref({});

    const fetchListParticipants = async () => {
    try {
      let apiUrl = `http://localhost:3000/api/events/${route.params.id}/responsesParticipant`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erreur HTTP');
      }
      let result = await response.json();
      canCome.value = result.canCome;
      cannotCome.value = result.cannotCome;
      
    } catch (err) {
      error.value = 'Erreur lors de la récupération des détails de l\'événement.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

    onMounted(() => {
      fetchListParticipants();
    });
  </script>
  
  <style scoped>
  
  .attendees {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .section {
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .card {
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 10px;
    background-color: #f9f9f9;
  }

  .person-info {
    display: flex;
    flex-direction: column;
  }

  .person-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .icon {
    margin-right: 10px;
  }

  .name {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .dates {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .dates li {
    margin: 5px 0;
  }

  </style>
  