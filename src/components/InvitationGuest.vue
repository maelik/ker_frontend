<template>
    <div class="event-details-container">
      <div v-if="loadingEvent">Chargement des données...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
          <h2>Hello !</h2>
          <h2>Bienvenue à {{ event.event.title }}</h2>
          <h3>Quel est ton email</h3>
          <input v-model="formGuestStore.email" placeholder="email@exemple.fr" type="email" />
          <p>Cela te permettra de retrouver facilement l'évènement. Nous n'utilisons cette donnée pour rien d'autre.</p>
          <button @click="commitEmail">C'est parti !</button>
        </div>        
    </div>
  </template>
  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useFormGuestStore } from '../stores/formGuestStore';

    const route = useRoute();
    const router = useRouter();
    const event = ref({});
    const formGuestStore = useFormGuestStore();
    const loadingEvent = ref(true);
    const error = ref(null);
    const email = ref(null);
    

    const fetchEventDetails = async () => {        
      try {
        let apiUrl = `${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/infoEvent`;
        
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

    const commitEmail = () => {      
      if (formGuestStore.email && event.value) {
        formGuestStore.updateEmail(formGuestStore.email);
        
        router.push({ name: 'EventDetails', params: { id: event.value.event.id } });
      } else {
        alert('Veuillez entrer un email.');
      }
    };
  
    onMounted(() => {
      fetchEventDetails();
    });
  
    //enregistrer l'email dans le userStore
    //redirection vers /events/id
  </script>
  
  <style scoped>
  /* Vos styles pour la page de détails */
  </style>
  