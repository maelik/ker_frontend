<template>
  <div>
    <h2>{{ formStore.title }} a été créé !</h2>
    <p>Voici le lien de ton évènement :</p>
    <input type="text" :value="eventLink" readonly />
    <button @click="copyLink">Copier</button>
    <p>Voir la page de mon événement</p>
  </div>
</template>

<script setup >
  import { ref } from 'vue';
  import { useFormStore } from '../stores/formStore';
  import { useUserStore } from '../stores/userStore';

  const formStore = useFormStore();
  const userStore = useUserStore();
  
  // Déclare eventLink comme une référence réactive
  const eventLink = ref('');

  async function createUserAndEvent() {
    try {
      // Première requête POST pour créer l'utilisateur
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/users/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formStore.email,
        }),
      });

      const userData = await userResponse.json();
      console.log(userData);

      // Mise à jour du store avec les informations de l'utilisateur
      userStore.updateToken(userData.token);
      userStore.updateEmail(userData.email);
      userStore.updateName(formStore.name);
      userStore.updateId(userData.id);

      console.log(userStore.userId); // Assure que le userId est bien récupéré

      // Deuxième requête POST pour créer l'événement, après avoir reçu le userId
      const eventResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/events/createEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formStore.title,
          description: formStore.description,
          userName: formStore.userName,
          location: formStore.location,
          userId: userStore.userId, // Utilise le userId récupéré
          dates: formStore.dates,
        }),
      });

      const eventData = await eventResponse.json();
      console.log(eventData);

      // Mise à jour du lien de l'événement
      eventLink.value = `${window.location.origin}${eventData.inviteLink}`;
      console.log(eventLink.value);

    } catch (error) {
      console.error('Erreur lors des requêtes POST:', error);
    }
  }

  // Appel de la fonction pour créer l'utilisateur et l'événement
  createUserAndEvent();     

  const copyLink = () => {
    navigator.clipboard.writeText(eventLink.value).then(() => {
      alert('Lien copié !');
    });
  };
</script>
