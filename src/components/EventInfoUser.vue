<template>
    <div class="event-edit-container">
      <div class="info-container">
        <div class="line"></div>
        <span class="info-text">Informations</span>
        <div class="line"></div>
      </div>
      <form @submit="saveEventChanges">
        <div class="form-size">
          <label class="label" for="event-name">Nom de l'événement</label>
          <input class="input-form" v-model="event.title" id="event-name" type="text" placeholder="Nom de l'événement" />
          
          <label class="label" for="user-name">Ton nom</label>
          <input class="input-form" v-model="event.userName" id="user-name" type="text" placeholder="Ton nom" />
    
          <label class="label" for="event-location">Lieu de l'événement</label>
          <input class="input-form" v-model="event.location" id="event-location" type="text" placeholder="Adresse de l'événement" />
    
          <label class="label">Dates proposées</label>
          <div v-for="(date, index) in event.EventDates" :key="index" class="date-selector">
            <VueDatePicker
              v-if="date"
                v-model="tempDates[index]"
                :placeholder="'Une date'"
                :format="'dd/MM/yyyy'"
                :enable-time-picker="false"
                :class="'custom-datepicker'"
                teleport-center
                @open="isDatePickerOpen = true"
                @blur="isDatePickerOpen = false"
                disabled
                ></VueDatePicker>
            <!-- <input class="input-form" type="date" v-model="date.proposed_date" :disabled="!date.isNew"/> -->
          </div>
          <!-- <button type="button" @click="addDate">+ Ajouter plus de dates</button> -->
    
          <label class="label" for="event-description">Une description</label>
          <textarea class="input-form" v-model="event.description" id="event-description" placeholder="Description"></textarea>
    
          <button type="submit">Valider les changements</button>
          <div class="padding-bottom"></div>
        </div>
      </form>
    </div>
</template>
  
  <script setup >
    import { ref, watch, toRefs } from 'vue';
    import { useUserStore } from '../stores/userStore';
    import VueDatePicker  from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    
    const props = defineProps({
      event: {
        type: Object,
        required: true
      }
    });
    const { event } = toRefs(props);
    const userStore = useUserStore();
    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;

    const tempDates = ref(event.value.EventDates.map(d => d.proposed_date ? new Date(d.proposed_date) : null));
    
    watch(
      () => tempDates.value, // Utilisez une fonction pour observer uniquement les changements de valeur
      (newDates) => {
        event.value.EventDates = newDates.map(date => ({
          proposed_date: date ? date.toISOString().split('T')[0] : null,
        }));
      },
      { deep: true } // Réduisez la profondeur pour éviter les calculs coûteux
    );


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

        const response = await fetch(`${API_URL}/api/events/${event.value.id}/user/${userStore.token}/updateEvent`, {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.line {
  flex: 1;
  height: 1px;
  background-color: #ebedf2;
}

.info-text {
  font-family: 'General sans';
  font-size: 14px;
  color: #a8acb7; 
  font-weight: 500;
}

form {
  display: flex;
  flex-direction: column;
  width: 100dvw;
  height: auto;
  max-height: 100%;
  align-items: center;
  margin-top: 20px;
}

.form-size {
  display: flex;
  flex-direction: column;
  width: 75dvw;
}

.label {
  font-family: 'General sans';
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  width: 70dvw;
}

.input-form {
  width: calc(75dvw - 30px);
  height: 8dvh;
  flex: 0 0 auto;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.05);
  color: #000000;
  margin: 10px 0;
  padding: 0px 15px;
  border: none;
  font-size: 14px;
  font-family: 'Switzer';
  font-weight: 400;
}

#event-description {
  height: 24dvh;
  padding: 15px;
}

.input-form:focus-visible {
    outline: 1px solid #A8ACB7;
}

.padding-bottom {
  min-height: 200px;
  width: 100%;
  background-color: transparent;
}

.form-size > button {
  background-color: #000000;
  width: 75dvw;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'General sans';
  font-weight: 500;
  margin-top: 10px;
  height: 42px;
}

.date-selector {
  margin: 5px 0px;
}

.dp__main :deep(.dp__input) {
  height: 7dvh;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  font-family: 'Switzer';
}

.dp__main :deep(.dp__calendar) {
  width: 85dvw;
}
.dp__main :deep(.dp__calendar_header_separator) {
  height: 0px;
}

.dp__main :deep(.dp__action_button) {
  font-family: 'General sans';
  font-size: 12px;
  font-weight: 500;
  padding: 3px 10px;
  height: auto;
}
.dp__main :deep(.dp__action_select) {
  background-color: #000;
}

.dp__main :deep(.dp__theme_light) {
  --dp-primary-color : #000;
}

</style>
  