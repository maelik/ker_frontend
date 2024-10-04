<template>
    <div class="home-container">
      <h1 class="home-title">Bienvenue sur Ker</h1>
      <button class="home-subtitle" @click="createEvent">+ Créer un évènement</button>
  
      <div class="email-retrieve-container">
        <label for="email" class="email-label">Ton email</label>
        <input type="email" v-model="email" id="email" placeholder="exemple@mail.com" class="email-input" />
        <button class="retrieve-events-button" @click="findEvents">Retrouver mes évènements</button>
      </div>
    </div>
  </template>
  
  <script setup >
    import { ref } from 'vue';
    import { useUserStore } from '../stores/userStore';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const userStore = useUserStore();
    const email = ref('');

    const findEvents = () => {
      if (email.value) {
        userStore.updateEmail(email.value); // On sauvegarde l'email dans le store
        router.push({ name: 'EventList' }); // Redirection vers la page des événements
      } else {
        alert('Veuillez entrer un email');
      }
    };

    const createEvent = () => {
      router.push({ name: 'Step1' }); // Redirection vers le formulaire de création d'événement
    };
    
</script> 
  
  <style scoped>
  /* Styles mobile-first */
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  
  .home-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .home-subtitle {
    font-size: 1.2rem;
    color: #555;
  }
  
  .create-event-button {
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    margin: 2rem 0;
    cursor: pointer;
  }
  
  .email-retrieve-container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .email-label {
    font-size: 1rem;
    color: #555;
  }
  
  .email-input {
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .retrieve-events-button {
    background-color: black;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* Ajout de styles pour plus grands écrans */
  @media (min-width: 768px) {
    .home-container {
      padding: 3rem;
    }
    .home-title {
      font-size: 3.5rem;
    }
    .create-event-button {
      padding: 1.5rem 3rem;
    }
  }
  
  </style>
  