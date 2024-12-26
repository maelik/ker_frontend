<template>
  <div class="bg-gradient" ref="bg"></div>
  <div class="container-bg">
    <h1>{{ formStore.title || "L'évènement"  }} <br>a été créé !</h1>
    <div class="link-container" @click="copyLink">
      <p>Copier le lien</p>
      <button>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.74251 19.125C8.49751 19.125 7.24501 18.6525 6.29251 17.7C4.39501 15.795 4.39501 12.705 6.29251 10.8075C6.51001 10.59 6.87001 10.59 7.08751 10.8075C7.30501 11.025 7.30501 11.385 7.08751 11.6025C5.62501 13.065 5.62501 15.4425 7.08751 16.905C8.55001 18.3675 10.9275 18.3675 12.39 16.905C13.095 16.2 13.485 15.255 13.485 14.25C13.485 13.2525 13.095 12.3075 12.39 11.595C12.1725 11.3775 12.1725 11.0175 12.39 10.8C12.6075 10.5825 12.9675 10.5825 13.185 10.8C14.1075 11.7225 14.61 12.945 14.61 14.25C14.61 15.555 14.1 16.7775 13.185 17.7C12.24 18.6525 10.995 19.125 9.74251 19.125Z" fill="#000000"/>
          <path d="M17.3025 13.62C17.16 13.62 17.0175 13.5675 16.905 13.455C16.6875 13.2375 16.6875 12.8775 16.905 12.66C18.4425 11.1225 18.4425 8.625 16.905 7.095C15.3675 5.5575 12.87 5.5575 11.34 7.095C10.5975 7.8375 10.185 8.8275 10.185 9.8775C10.185 10.9275 10.5975 11.9175 11.34 12.66C11.5575 12.8775 11.5575 13.2375 11.34 13.455C11.1225 13.6725 10.7625 13.6725 10.545 13.455C9.5925 12.5025 9.06 11.2275 9.06 9.8775C9.06 8.5275 9.585 7.2525 10.545 6.3C12.5175 4.3275 15.7275 4.3275 17.7075 6.3C19.68 8.2725 19.68 11.49 17.7075 13.4625C17.595 13.5675 17.445 13.62 17.3025 13.62Z" fill="#000000"/>
        </svg>
      </button>
    </div>
    <div class="redirect-container" @click="redirectEvent">
      <p>Voir la page de mon événement</p>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#000000"/>
      </svg>
    </div>
  </div>
</template>

<script setup >
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useFormStore } from '../stores/formStore';
  import { useUserStore } from '../stores/userStore';
  import { useRouter } from 'vue-router';   
  import { gsap} from 'gsap';

  const formStore = useFormStore();
  const userStore = useUserStore();
  const router = useRouter();
  const eventData = ref(null);
  const bg = ref(null);
  
  
  
  // Déclare eventLink comme une référence réactive
  const eventLink = ref('');
  const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;

  async function createUserAndEvent() {
    try {
      // Première requête POST pour créer l'utilisateur
      const userResponse = await fetch(`${API_URL}/api/users/createUser`, {
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
      const eventResponse = await fetch(`${API_URL}/api/events/createEvent`, {
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

      eventData.value = await eventResponse.json();
      console.log(eventData);
      
      const eventCreated = [
        {
          'id' : eventData.value.eventId,
          'title' : formStore.title,
        }
      ]
      userStore.updateEventsCreated(eventCreated);

      console.log(userStore);
      

      // Mise à jour du lien de l'événement
      eventLink.value = `${window.location.origin}${eventData.value.inviteLink}`;
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

  const redirectEvent = () => {
    console.log(eventData);    
    if (eventData.value && eventData.value.eventId) {
      router.push({ name: 'EventDetails', params: { id: eventData.value.eventId } });
    }
  };

  const timelineAnimationGradient = gsap.timeline();

    onMounted(() => {
      timelineAnimationGradient
        .fromTo(bg.value,{
          backgroundSize: '300%',
        },{
          delay: 0.5,
          duration: 0.3,
          backgroundSize: '100%',
        }
      )
    });

    onBeforeUnmount(() => {
      timelineAnimationGradient.kill();
    });
  
</script>

<style scoped>

.container-bg {
  margin-top: 10dvh;
  position: relative;
  z-index: 1;
  width: 100dvw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-image: url('/assets/Gradient bg.png');
  opacity: 0.5;
  z-index: -1;
}

.container-bg > h1 {
  font-family: 'General sans';
  font-size: 40px;
  line-height: 36px;
  font-weight: 500;
  text-align: center;
  width: 70%;
}

.link-container {
  display: flex;
  align-items: center;
}

.link-container > button {
  background: transparent;
  border: none;
}

p {
  font-family: 'General sans';
  font-size: 12px;
  font-weight: 600;
}

.redirect-container {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 15dvh;
}

.redirect-container > svg {
  transform: rotate(180deg);
}

</style>
