<template>
    <div class="event-details-container">    
      <form @submit="saveGuestResponses">
        <label for="user-name">Quel est ton nom ?</label>
        <input v-model="formGuestStore.guestName" id="user-name" type="text" placeholder="Ton nom" />
  
        <label>Voter pour une date</label>
        <div v-for="(date, index) in event.EventDates" :key="index" class="date-selector">
          <input 
            type="checkbox" 
            :id="'date-' + index" 
            :name="'eventDate-' + index" 
            v-model="date.selected" 
            @change="updateResponse(date.id, date.selected)"/>
          <label :for="'date-' + index">{{ date.proposed_date }}</label>
        </div>
        <p>{{ event.location }}</p>

        <button type="submit">✔ Valider les changements</button>
      </form>
    </div>
  </template>
  
  <script setup >
    import { ref, toRefs,  onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFormGuestStore } from '../stores/formGuestStore';
    import { useUserStore } from '../stores/userStore';
    
    const props = defineProps({
      event: {
        type: Object,
        required: true
      }
    });
    const route = useRoute();
    const { event } = toRefs(props);
    const formGuestStore = useFormGuestStore();
    const userStore = useUserStore();
    const error = ref(null);    
    
    //fonction qui créer le guest
    const fetchGuestInvitation = async () => {
      try {
        let apiUrl = `http://localhost:3000/api/events/${route.params.id}/invite`;
        let response = null;
        
        if(userStore.email) {
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userStore.email,
            }),
          });
        }
        

        if (!response.ok) {
          throw new Error('Erreur HTTP');
        }
        const guestInvitation = await response.json();        
        
        userStore.updateEmail(guestInvitation.guest.email);
        userStore.updateToken(guestInvitation.guest.token);
        userStore.updateName(guestInvitation.invitation.guestName);
        userStore.updateId(guestInvitation.guest.id);
        userStore.resetListEvents();
        formGuestStore.updateEmail(guestInvitation.guest.email);
        formGuestStore.updateGuestName(guestInvitation.invitation.guestName);
        formGuestStore.updateAccepted(guestInvitation.invitation.accepted);
        
        fetchGuestResponses();

      } catch (err) {
        error.value = 'Erreur lors de la récupération des détails de l\'événement.';
        console.error(err);
      } finally {
        //loadingFavoriteDate.value = false;
      }
    };
  
    
    //fonction pour récupérer les réponses du guest
    const fetchGuestResponses = async () => {
      try {
        let apiUrl = `http://localhost:3000/api/guests/${userStore.token}/event/${route.params.id}/response`;
        
        const response = await fetch(apiUrl);
           

        if (!response.ok) {
          throw new Error('Erreur HTTP');
        }
        const guestResponses = await response.json();

        let responseDate = [];
        
        event.value.EventDates.forEach(date => {
          const responseGuest = guestResponses.GuestResponses.find(res => res.EventDate.proposed_date === date.proposed_date);          
          date.selected = responseGuest ? responseGuest.response : false;
          responseDate.push({
            "eventDateId" : date.id,
            "responseValue":responseGuest ? responseGuest.response : false
          });
        });
        formGuestStore.updateResponses(responseDate);
        
        
      } catch (err) {
        error.value = 'Erreur lors de la récupération des détails de l\'événement.';
        console.error(err);
      } finally {
        //loadingFavoriteDate.value = false;
      }
    };

    //
    const updateResponse = (eventDateId, responseValue) => {
      const responseIndex = formGuestStore.responses.findIndex(res => res.eventDateId === eventDateId);
      if (responseIndex !== -1) {
        // Si la réponse existe déjà, on la met à jour
        formGuestStore.responses[responseIndex].responseValue = responseValue;
      } else {
        // Sinon, on l'ajoute
        formGuestStore.responses.push({ eventDateId, responseValue });
      }
    };
    
    // fonction pour modifier les réponses
    const saveGuestResponses = async () => {
      try {
        const guestResponse = await fetch(`http://localhost:3000/api/guests/${userStore.token}/event/${route.params.id}/response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guestName: formGuestStore.guestName,
            accepted: formGuestStore.accepted,
            responses: formGuestStore.responses,
          }),
        });

        // Vérification si la requête est réussie
        if (!guestResponse.ok) {
          throw new Error('Erreur lors de la soumission de la réponse');
        }

        const eventData = await guestResponse.json();
        console.log(eventData);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };



    onMounted(() => {
      fetchGuestInvitation();
    });
  </script>
  
  <style scoped>
    form {
      display: flex;
      flex-direction: column;
    }
  </style>
  