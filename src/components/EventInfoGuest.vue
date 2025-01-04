<template>
    <div class="event-info-guest-container"> 
      <div class="info-container">
        <div class="line"></div>
        <span class="info-text">Informations</span>
        <div class="line"></div>
      </div>   
      <form @submit="saveGuestResponses">
        <label class="label" for="user-name">Quel est ton nom ?</label>
        <input class="input-form" v-model="formGuestStore.guestName" id="user-name" type="text" placeholder="Ton nom" />
  
        <label class="label">Voter pour une date</label>

        <Draggable v-model="event.EventDates" item-key="id" class="draggable" :filter="'.checkbox-icon'">
          <template #item="{ element }">
            <div class="date-selector">
              <label class="label checkbox-svg" :for="'date-' + element.id">
              <input 
                type="checkbox"
                :id="'date-' + element.id" 
                :name="'date-' + element.id" 
                v-model="element.selected" 
                @change="updateResponse(element.id, element.selected)"/>
  
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkbox-icon">
                  <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2.25" :stroke="element.selected ? '#131313' : '#a8acb7'" stroke-width="1.5"/>
                  <path  v-if="element.selected" d="M10.2951 17C10.055 17 9.82691 16.8995 9.65883 16.7238L6.26113 13.1702C5.91296 12.8061 5.91296 12.2033 6.26113 11.8392C6.6093 11.4751 7.18559 11.4751 7.53377 11.8392L10.2951 14.7272L16.4662 8.27311C16.8144 7.90896 17.3907 7.90896 17.7389 8.27311C18.087 8.63725 18.087 9.23997 17.7389 9.60412L10.9315 16.7238C10.7634 16.8995 10.5353 17 10.2951 17Z" fill="#131313"/>
                </svg>
  
                {{ element.proposed_date }}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
                  <path d="M14 5.16666H2C1.72667 5.16666 1.5 4.94 1.5 4.66666C1.5 4.39333 1.72667 4.16666 2 4.16666H14C14.2733 4.16666 14.5 4.39333 14.5 4.66666C14.5 4.94 14.2733 5.16666 14 5.16666Z" fill="#A8ACB7"/>
                  <path d="M14 8.5H2C1.72667 8.5 1.5 8.27333 1.5 8C1.5 7.72667 1.72667 7.5 2 7.5H14C14.2733 7.5 14.5 7.72667 14.5 8C14.5 8.27333 14.2733 8.5 14 8.5Z" fill="#A8ACB7"/>
                  <path d="M14 11.8333H2C1.72667 11.8333 1.5 11.6067 1.5 11.3333C1.5 11.06 1.72667 10.8333 2 10.8333H14C14.2733 10.8333 14.5 11.06 14.5 11.3333C14.5 11.6067 14.2733 11.8333 14 11.8333Z" fill="#A8ACB7"/>
                </svg>
              </label>
            </div>
          </template>
        </Draggable>
        
        <button type="submit">Valider les changements</button>
        <div class="padding-bottom"></div>
      </form>
    </div>
  </template>
  
  <script setup >
    import { ref, toRefs,  onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFormGuestStore } from '../stores/formGuestStore';
    import { useUserStore } from '../stores/userStore';
    import Draggable from 'vuedraggable';
    
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
    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL; 
    
    //fonction qui créer le guest
    const fetchGuestInvitation = async () => {
      try {
        let apiUrl = `${API_URL}/api/events/${route.params.id}/invite`;
        
        let response = null;
        if(formGuestStore.email) {
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formGuestStore.email,
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
        let apiUrl = `${API_URL}/api/guests/${userStore.token}/event/${route.params.id}/response`;
        
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
        const guestResponse = await fetch(`${API_URL}/api/guests/${userStore.token}/event/${route.params.id}/response`, {
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

    .event-info-guest-container {
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
    }
    form {
      display: flex;
      flex-direction: column;
      width: 75dvw;
      margin: 0 auto;
      padding-top: 20px;
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

    .input-form:focus-visible {
        outline: 1px solid #A8ACB7;
    }

    .padding-bottom {
      min-height: 200px;
      width: 100%;
      background-color: transparent;
    }

    form > button {
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
      width: calc(75dvw - 30px);
      border: 1px solid #ebedf2;
      margin-bottom: 8px;
      border-radius: 4px;
      padding: 15px;
    }

    .date-selector > label {
      margin: 0px;
      font-size: 14px;
    }

    .checkbox-svg > input {
      display: none;
    }

    .menu-icon {
      margin-left: auto;
      /* position: absolute;
      left: 7dvw;
      transform: translateX(-50%); */
      scale: 1.3;
    }

    .checkbox-svg {
      width: auto;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-svg .checkbox-icon {
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    /* Animation au clic */
    .checkbox-svg .checkbox-icon:active {
      transform: scale(0.9);
    }

    .first {
      margin-top: 10px;
    }

    .draggable {
      margin-top: 10px;
    }
  </style>
  