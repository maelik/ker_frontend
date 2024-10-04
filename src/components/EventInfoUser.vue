<template>
    <div class="event-edit-container">

      <form @submit.prevent="saveEventChanges">
        <label for="event-name">Quel est le nom de ton événement ?</label>
        <input v-model="event.title" id="event-name" type="text" placeholder="Nom de l'événement" />
        
        <label for="user-name">Quel est ton nom ?</label>
        <input v-model="event.userName" id="user-name" type="text" placeholder="Ton nom" />
  
        <label for="event-location">Où se passe l'événement ?</label>
        <input v-model="event.location" id="event-location" type="text" placeholder="Adresse de l'événement" />
  
        <label>Propose plusieurs dates</label>
        <div v-for="(date, index) in event.EventDates" :key="index" class="date-selector">
          <input type="date" v-model="date.proposed_date" :disabled="!date.isNew"/>
        </div>
        <button type="button" @click="addDate">+ Ajouter plus de dates</button>
  
        <label for="event-description">Une description, des besoins pour cet événement ?</label>
        <textarea v-model="event.description" id="event-description" placeholder="Description"></textarea>
  
        <button type="submit">✔ Valider les changements</button>
      </form>
    </div>
</template>
  
  <script setup >
    import { toRefs } from 'vue';
    import { useUserStore } from '../stores/userStore';
    
    const props = defineProps({
      event: {
        type: Object,
        required: true
      }
    });
    const { event } = toRefs(props);
    const userStore = useUserStore();

    const addDate = () => {
        event.value.EventDates.push({ proposed_date: '', isNew: true });
    };

    const saveEventChanges = async () => {
      try {
        const updatedEvent = {
          title: event.value.title,
          userName: event.value.userName,
          location: event.value.location,
          description: event.value.description,
          eventDates: event.value.EventDates.map(date => ({
            eventId: event.value.id,
            proposed_date: date.proposed_date,
            vote: 0,
          }))
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.value.id}/user/${userStore.token}/updateEvent`, {
          method: 'PUT', // Utilisation de PUT pour mettre à jour
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour");
        }

        const data = await response.json();
        console.log("Événement mis à jour avec succès:", data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    
  </script>
  
  <style scoped>
.event-edit-container {
  padding: 20px;
  font-family: sans-serif;
}

h1 {
  font-size: 1.5em;
}

.event-favorite-date {
  margin-top: 10px;
}

.event-links {
  margin-top: 20px;
}

.event-links a,
.event-links button {
  color: #007bff;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input,
textarea {
  margin: 5px 0 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
  