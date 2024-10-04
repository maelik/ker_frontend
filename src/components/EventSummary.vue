<template>
    <div class="event-edit-container">
      <button @click="$router.back()">← Retour </button>
      <h1>{{ event.title }}</h1>
      
      <div class="event-favorite-date">
        <p>Date favorite pour le moment</p>
        <div v-for="(date, index) in favoriteDate.eventDate" :key="index" class="date-selector">
          <strong>{{ date.proposed_date }}</strong>
        </div>        
      </div> 
      <div v-if="view == 'user'">
          <div class="event-links">
            <p>Lien de l'événement</p>
            <button @click="copyLink">Copier le lien</button>
          </div>
      </div>
      <div v-if="view == 'guest'">
          <div class="event-participation">
            <button :class="['btn', formGuestStore.accepted === true ? 'selected' : 'not-selected']"
            @click="setAttendance(true)">Je viens</button>
            <button :class="['btn', formGuestStore.accepted === false ? 'selected' : 'not-selected']"
            @click="setAttendance(false)">Je ne viens pas</button>
          </div>
      </div>
    </div>
</template>
  
  <script setup >
    import { toRefs } from 'vue';
    import { useFormGuestStore } from '../stores/formGuestStore';
    
    const props = defineProps({
      view: {
        type: String,
        required: true
      },
      event: {
        type: Object,
        required: true
      },
      favoriteDate: {
        type: Object,
        required: true
      },
    });
    const { view, event, favoriteDate } = toRefs(props);
    const formGuestStore = useFormGuestStore();
  
    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/event/${event.value.id}/invite`).then(() => {
            alert('Lien copié !');
        });
    };

    const setAttendance = (value) => {
      formGuestStore.updateAccepted(value);
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
  cursor: pointer;
}

.event-participation {
  margin-top: 20px;
  display: flex;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.selected {
  background-color: black;
  color: white;
}

.not-selected {
  background-color: lightgray;
  color: gray;
  border: 1px solid gray;
}

</style>
  