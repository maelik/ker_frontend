<template>
  <div class="container">
    <div class="bg-gradient" ref="bg"></div>
    <div v-if="loadingEvent">Chargement des données...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="invitation-container">
      <RouterLink class="link" to="/">
        <svg ref="logo" width="89" height="44" viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
          <rect width="89" height="44" rx="21.5235" fill="black"/>
          <path d="M73.4325 16.3495C73.4325 19.9342 70.6603 21.9178 67.1951 22.109L69.7044 28.6093C70.2062 29.8998 71.3534 29.8998 71.9269 29.9476L71.6401 31.0469H67.0756L63.5864 22.1568H62.0569L60.5036 28.2269C60.4319 28.4659 60.408 28.681 60.408 28.8722C60.408 30.0193 61.6029 29.8998 62.1764 29.9715L61.9613 31.0469H54.0988L54.4095 29.9715C54.9592 29.9476 56.5842 29.8042 57.0861 27.7967L60.1212 15.6325C60.1929 15.3696 60.2168 15.1307 60.2168 14.9395C60.2168 13.649 58.998 13.5534 58.4722 13.5534L58.7351 12.4063H66.5737C70.6842 12.4063 73.4325 13.5534 73.4325 16.3495ZM69.7522 16.4451C69.7522 14.7483 68.1271 14.3181 65.8807 14.3181H64.0166L62.5827 20.1971H64.8769C67.8881 20.1971 69.7522 18.8349 69.7522 16.4451Z" fill="white"/>
          <path d="M56.1251 12.4063L56.866 17.1142L55.6472 17.3771L54.8585 15.5369C54.4523 14.581 53.5919 14.0074 51.919 14.0074H48.2148C47.2589 14.0074 46.8526 14.3898 46.5897 15.3935L45.347 20.2688H49.5053C51.3455 20.2688 51.704 19.4085 51.8712 19.05L52.2058 18.3091H53.4963L51.9668 24.2359H50.6763C50.7241 23.973 50.7958 23.5906 50.7958 23.2561C50.7958 22.6108 50.5568 22.0134 49.5531 22.0134H44.893L43.244 28.4898C43.1962 28.6571 43.1723 28.7766 43.1723 28.8961C43.1723 29.374 43.5308 29.5174 44.2955 29.5174H47.6413C50.2701 29.5174 51.7996 28.1552 52.5882 27.3427L54.2133 25.6459L55.0019 26.2195L51.7279 31.0469H36.887L37.1738 29.8998C38.1298 29.8281 39.3486 29.852 39.8026 28.0118L43.005 15.2502C43.0528 15.0351 43.0767 14.8439 43.0767 14.6766C43.0767 13.5534 41.9296 13.6251 41.3799 13.5534L41.5711 12.4063H56.1251Z" fill="white"/>
          <path d="M32.4569 12.4063H40.1282L39.8176 13.5534C39.1484 13.649 38.2403 13.888 36.7347 15.0351L30.0671 20.1015L34.775 28.6571C35.3486 29.6847 36.9737 29.8998 37.6189 29.9476L37.4038 31.0469H28.5137L28.7527 29.9715C29.4218 29.9476 30.8318 29.9715 30.8318 28.9439C30.8318 28.6571 30.7123 28.2747 30.4733 27.8206L27.3666 22.0851L25.8371 23.2561L24.69 27.8684C24.5944 28.203 24.5705 28.4898 24.5705 28.7288C24.5705 30.0193 25.6459 29.9237 26.3151 29.9954L26.1 31.0469H18.2852L18.5003 29.9476C19.289 29.8998 20.7229 29.7325 21.2247 27.7728L24.2598 15.6803C24.2837 15.5369 24.3076 15.4174 24.3076 15.2741C24.3076 13.7924 21.9417 13.649 20.3405 13.649H19.3846C16.3256 13.6729 13.9597 15.2741 13.9597 18.5242C13.9597 19.8625 14.82 21.6071 16.3973 21.6071C17.6639 21.6071 17.6161 20.5317 17.7356 19.5996C17.879 18.5003 18.6198 17.2815 19.9581 17.2815C20.8663 17.2815 21.4398 18.1419 21.4398 19.0022C21.4398 21.2725 19.2651 23.2083 16.7558 23.2083C13.9836 23.2083 12 21.3203 12 18.5959C12 14.581 15.0351 12 19.1695 12C22.2285 12 24.5705 12.4063 27.6534 12.4063H30.7601L30.4733 13.5534C29.5174 13.649 28.2508 13.8163 27.8206 15.5847L26.6018 20.6034L33.15 15.6086C33.6996 15.2024 33.8908 14.8439 33.8908 14.581C33.8908 13.9358 32.8393 13.6251 32.2179 13.5534L32.4569 12.4063Z" fill="white"/>
        </svg>
      </RouterLink>
      <div class="title-container" :style="{ position: 'relative', bottom: `${titleContainerPosition}px` }">
        <h1>Hello !</h1>
        <h1>Bienvenue à {{ event.event.title }}</h1>
      </div>
      <div class="input-container">
        <h3 :style="{ position: `${inputPositionDOM}`, bottom: `${titlePosition}px` }">Ton email</h3>
        <input :style="{ position: `${inputPositionDOM}`, bottom: `${inputPosition}px`, width: `${widthInput}%` }" v-model="formGuestStore.email" placeholder="email@exemple.fr" type="email" :class="{ invalid: emailError }" @blur="validateEmail" @focus="focusAction" @keyup.enter="commitEmail"/>
        <p v-if="emailError" :style="{ position: `${inputPositionDOM}`, bottom: `${textPosition}px` }" class="error-message">{{ emailError }}</p>
      </div>
      <div class="btn-container">
        <p>Cela te permettra de retrouver facilement l'évènement. Nous n'utilisons cette donnée pour rien d'autre.</p>
        <button @click="commitEmail" :style="{ bottom: `${buttonOffset}px` }" :disabled="isDisabled" :class="{ disabled: isDisabled, enabled: !isDisabled }" ref="button">Voir l'évènement</button>
      </div>
    </div>
  </div>
  
</template>
  
  <script setup >
    import { computed, ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useFormGuestStore } from '../stores/formGuestStore';
    import { useUserStore } from '../stores/userStore';
    import { gsap} from 'gsap';

    const route = useRoute();
    const router = useRouter();
    const event = ref({});
    const formGuestStore = useFormGuestStore();
    const userStore = useUserStore();
    const loadingEvent = ref(true);
    const error = ref(null);
    const bg = ref(null);
    const button = ref(null);
    const buttonOffset = ref(20);
    const inputPosition = ref(0)
    const titlePosition = ref(0);
    const titleContainerPosition = ref(0);
    const textPosition = ref(0);
    const widthInput = ref(100);
    const inputPositionDOM = ref("relative");
    const emailError = ref("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const isDisabled = computed(() => formGuestStore.email.length < 1 || !emailRegex.test(formGuestStore.email));

    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;
    
  
    const fetchEventDetails = async () => {        
      try {
        let apiUrl = `${API_URL}/api/events/${route.params.id}/infoEvent`;
        
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

    const validateEmail = () => {  
      inputPosition.value = 0;
      adjustButtonInputPosition();    
       if (!emailRegex.test(formGuestStore.email)) {
        emailError.value = "Mauvaise syntaxe de l'adresse mail";        
        return false;
      }
      emailError.value = ""; // Pas d'erreur
      return true;
    };

    const focusAction = () => {
      // Ajuste la hauteur de l'input lorsque l'utilisateur le sélectionne
      adjustButtonInputPosition();
    };

    const commitEmail = () => {
      if (formGuestStore.email && event.value && validateEmail) {
        formGuestStore.updateEmail(formGuestStore.email);
        userStore.resetStore();
        userStore.updateEmail(formGuestStore.email);
        router.push({ name: 'EventDetails', params: { id: event.value.event.id } });
      } else {
        alert('Veuillez entrer un email.');
      }
    };

    const adjustButtonInputPosition = () => {
      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;

      if (viewportHeight < windowHeight) {
        const keyboardHeight = windowHeight - viewportHeight;
        buttonOffset.value = keyboardHeight + 20; // Ajoute un espace au-dessus du clavier
        inputPositionDOM.value = "absolute";
        inputPosition.value = keyboardHeight + 123;
        titlePosition.value = keyboardHeight + 191;
        textPosition.value = keyboardHeight + 100;
        widthInput.value = 75;
        titleContainerPosition.value = 80;
      } else {
        buttonOffset.value = 20; // Réinitialise la position
        inputPosition.value = 0;
        titlePosition.value = 0;
        textPosition.value = 0;
        widthInput.value = 100;
        titleContainerPosition.value = 0;
        inputPositionDOM.value = "relative"; 
      }
    };

    const timelineAnimationGradient = gsap.timeline();
  
    onMounted(() => {
      fetchEventDetails();
      timelineAnimationGradient
        .to(bg.value,{
          delay: 0.5,
          duration: 0.3,
          backgroundSize: '100%',
        }
      )
      window.visualViewport.addEventListener("resize", adjustButtonInputPosition);
    });

    onUnmounted(() => {
      window.visualViewport.removeEventListener("resize", adjustButtonInputPosition);
    });

    onBeforeUnmount(() => {
      timelineAnimationGradient.kill();
    });
  </script>
  
  <style scoped>

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

  .container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .invitation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .bg-gradient {
    position: fixed;
    transform: translateY(-10%);
    width: 100%;
    height: 150%;
    background-image: url('/assets/Gradient bg.png');
    background-size: 300%;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.8;
  }

  .logo {
    margin-top: 16px;
  }

  .title-container {
    flex-grow: 3;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title-container > h1 {
    font-family: 'General sans';
    font-size: 36px;
    font-weight: 500;
    line-height: 32px;
  }

  .input-container {
    flex-grow: 2;
    width: 75%;
    display: flex;
    flex-direction: column;
  }

  .input-container > h3 {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 16px;
    color: #070303;
  }

  .input-container > input {
    border: none;
    height: 55px;
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(52px);
    padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    font-weight: 400;
    font-size: 16px;
    color: #131313;
    font-family: 'Switzer';
  }

  .input-container > input:focus-visible {
    outline: 1px solid #A8ACB7;
  }

  .input-container > input::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: #A8ACB7;
    font-family: 'Switzer';
  }

  input.invalid {
    outline: 1px solid #ee5253 !important;
  }

  .error-message {
    position: absolute;
    margin-top: 5px;
    color: #ee5253;
    font-size: 0.9em;
    font-family: 'General sans';
    font-weight: 400;
  }

  .btn-container {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn-container > p {
    width: 75%;
    font-family: 'BookmanJFPro Regular';
    font-weight: 400;
    font-style: italic;
    font-size: 12px;
    text-align: center;
    line-height: 12px;
    color: #33343F;
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin-bottom: 70px;
  }

  .btn-container > button {
    height: 50px;
    border: none;
    border-radius: 4px;
    font-family: 'General sans';
    font-size: 14px;
    font-weight: 500;
    width: 90%;
    position: absolute;
  }

  .btn-container > .enabled{
    background-color: #131313;
    color: #fff;
  }
  .btn-container > .disabled{
    background-color: #EBEDF2;
    color: #A8ACB7;
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (orientation: landscape) and (min-width: 768px) {
  .bg-gradient {
    width: 500px; /* largeur de view-container */
  }
}

  </style>
  