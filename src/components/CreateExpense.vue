<template>
  <div v-if="isDatePickerOpen" class="overlay"></div>
  <div class="expense-container">

    <div class="header">
      <RouterLink class="link" to="/">
          <svg ref="logo" width="89" height="44" viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo" :style="{ transform: `translateY(${translateY}px)` }">
            <rect width="89" height="44" rx="21.5235" fill="black"/>
            <path d="M73.4325 16.3495C73.4325 19.9342 70.6603 21.9178 67.1951 22.109L69.7044 28.6093C70.2062 29.8998 71.3534 29.8998 71.9269 29.9476L71.6401 31.0469H67.0756L63.5864 22.1568H62.0569L60.5036 28.2269C60.4319 28.4659 60.408 28.681 60.408 28.8722C60.408 30.0193 61.6029 29.8998 62.1764 29.9715L61.9613 31.0469H54.0988L54.4095 29.9715C54.9592 29.9476 56.5842 29.8042 57.0861 27.7967L60.1212 15.6325C60.1929 15.3696 60.2168 15.1307 60.2168 14.9395C60.2168 13.649 58.998 13.5534 58.4722 13.5534L58.7351 12.4063H66.5737C70.6842 12.4063 73.4325 13.5534 73.4325 16.3495ZM69.7522 16.4451C69.7522 14.7483 68.1271 14.3181 65.8807 14.3181H64.0166L62.5827 20.1971H64.8769C67.8881 20.1971 69.7522 18.8349 69.7522 16.4451Z" fill="white"/>
            <path d="M56.1251 12.4063L56.866 17.1142L55.6472 17.3771L54.8585 15.5369C54.4523 14.581 53.5919 14.0074 51.919 14.0074H48.2148C47.2589 14.0074 46.8526 14.3898 46.5897 15.3935L45.347 20.2688H49.5053C51.3455 20.2688 51.704 19.4085 51.8712 19.05L52.2058 18.3091H53.4963L51.9668 24.2359H50.6763C50.7241 23.973 50.7958 23.5906 50.7958 23.2561C50.7958 22.6108 50.5568 22.0134 49.5531 22.0134H44.893L43.244 28.4898C43.1962 28.6571 43.1723 28.7766 43.1723 28.8961C43.1723 29.374 43.5308 29.5174 44.2955 29.5174H47.6413C50.2701 29.5174 51.7996 28.1552 52.5882 27.3427L54.2133 25.6459L55.0019 26.2195L51.7279 31.0469H36.887L37.1738 29.8998C38.1298 29.8281 39.3486 29.852 39.8026 28.0118L43.005 15.2502C43.0528 15.0351 43.0767 14.8439 43.0767 14.6766C43.0767 13.5534 41.9296 13.6251 41.3799 13.5534L41.5711 12.4063H56.1251Z" fill="white"/>
            <path d="M32.4569 12.4063H40.1282L39.8176 13.5534C39.1484 13.649 38.2403 13.888 36.7347 15.0351L30.0671 20.1015L34.775 28.6571C35.3486 29.6847 36.9737 29.8998 37.6189 29.9476L37.4038 31.0469H28.5137L28.7527 29.9715C29.4218 29.9476 30.8318 29.9715 30.8318 28.9439C30.8318 28.6571 30.7123 28.2747 30.4733 27.8206L27.3666 22.0851L25.8371 23.2561L24.69 27.8684C24.5944 28.203 24.5705 28.4898 24.5705 28.7288C24.5705 30.0193 25.6459 29.9237 26.3151 29.9954L26.1 31.0469H18.2852L18.5003 29.9476C19.289 29.8998 20.7229 29.7325 21.2247 27.7728L24.2598 15.6803C24.2837 15.5369 24.3076 15.4174 24.3076 15.2741C24.3076 13.7924 21.9417 13.649 20.3405 13.649H19.3846C16.3256 13.6729 13.9597 15.2741 13.9597 18.5242C13.9597 19.8625 14.82 21.6071 16.3973 21.6071C17.6639 21.6071 17.6161 20.5317 17.7356 19.5996C17.879 18.5003 18.6198 17.2815 19.9581 17.2815C20.8663 17.2815 21.4398 18.1419 21.4398 19.0022C21.4398 21.2725 19.2651 23.2083 16.7558 23.2083C13.9836 23.2083 12 21.3203 12 18.5959C12 14.581 15.0351 12 19.1695 12C22.2285 12 24.5705 12.4063 27.6534 12.4063H30.7601L30.4733 13.5534C29.5174 13.649 28.2508 13.8163 27.8206 15.5847L26.6018 20.6034L33.15 15.6086C33.6996 15.2024 33.8908 14.8439 33.8908 14.581C33.8908 13.9358 32.8393 13.6251 32.2179 13.5534L32.4569 12.4063Z" fill="white"/>
          </svg>
      </RouterLink>
      <button @click="goBack" class="back"> 
        Retour 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#A8ACB7"/>
        </svg>
      </button>
    </div>
    <form @submit.prevent="createExpense">
      <h1>Créer une dépense</h1>
      
      <label class="label" for="amount">Montant de la dépense</label>
      <div class="input-container">
        <input class="currency-input" v-model="amount" id="amount" type="number" placeholder="Montant" />
        <span class="currency-symbol">€</span>
      </div>
  
      <label class="label" for="description">Nom de la dépense</label>
      <input class="input-form" v-model="description" id="description" type="text" placeholder="Description" />
      
      <label class="label" for="payer">Qui paie la dépense</label>
      <div class="input-container">
        <select class="input-form" id="payerSelect" v-model="payer">
          <option v-for="(participant, index) in listParticipants" :key="participant.id" :value="participant.name">{{ participant.name }}</option>
        </select>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="currency-symbol">
          <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#A8ACB7"/>
        </svg>
      </div>
  
      <label class="label" for="date">La date de la dépense</label>
      <VueDatePicker
                  v-model="date"
                  :placeholder="'Une date'"
                  :format="'dd/MM/yyyy'"
                  :enable-time-picker="false"
                  :class="'custom-datepicker'"
                  teleport-center
                  @open="isDatePickerOpen = true"
                  @blur="isDatePickerOpen = false"
                  ></VueDatePicker>
      
      <label class="label">Qui a participé</label>
      <div v-for="(participant, index) in listParticipants" :key="index" class="participant" :class="{ 'first' : index === 0 }">
        <label class="label checkbox-svg" :for="'participant-' + index">
          <input 
            type="checkbox" 
            :id="'participant-' + index" 
            :name="'participant-' + index" 
            v-model="participant.selected"/>
    
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkbox-icon">
            <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2.25" :stroke="participant.selected ? '#131313' : '#a8acb7'" stroke-width="1.5"/>
            <path  v-if="participant.selected" d="M10.2951 17C10.055 17 9.82691 16.8995 9.65883 16.7238L6.26113 13.1702C5.91296 12.8061 5.91296 12.2033 6.26113 11.8392C6.6093 11.4751 7.18559 11.4751 7.53377 11.8392L10.2951 14.7272L16.4662 8.27311C16.8144 7.90896 17.3907 7.90896 17.7389 8.27311C18.087 8.63725 18.087 9.23997 17.7389 9.60412L10.9315 16.7238C10.7634 16.8995 10.5353 17 10.2951 17Z" fill="#131313"/>
          </svg>
          
          {{ participant.name }}
        </label>
      </div>
  
      <button type="submit">Ajouter une  dépense</button>
      <div class="padding-bottom"></div>
    </form>
  </div>
</template>

  <script setup>
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';
    import VueDatePicker  from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const error = ref(null);
    const userStore = useUserStore();
    const listParticipants = ref([]);
    const amount = ref('');
    const description = ref('');
    const payer = ref('');
    const date = ref('');
    const isDatePickerOpen = ref(false); 
    const userName = computed(() => userStore.name);
    const payerId = ref('');
    const payerType = ref('');
    

    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;

    const translateY = ref(0); // Gère la position Y de l'effet parallax
    const isWideScreen = ref(window.innerWidth >= 768);

    // Fonction pour mettre à jour l'effet parallax
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Distance scrollée
      translateY.value = -scrollTop; // Ajuste le facteur parallax
    };

    // Fonction pour vérifier la taille de l'écran
    const handleResize = () => {
      isWideScreen.value = window.innerWidth >= 768; // Met à jour la condition
    };

    const goBack = () => {
      router.back(); // Retour à la liste des discussions
    };

    const fetchListParticipant = async () => {
        try {
            let apiUrl = `${API_URL}/api/events/${route.params.id}/listParticipants`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            let result = await response.json();

            listParticipants.value = result.listParticipants;
            
            initSelectedParticipant();
            
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const createExpense = async () => {
        try { 
            const listParticipantsSelected = listParticipants.value.filter(p => p.selected);
            console.log(date.value);
            
            const response = await fetch(`${API_URL}/api/events/${route.params.id}/tricount/createExpense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount.value,
                    description: description.value,
                    date: date.value,
                    payerId: payerId.value,
                    payerType: payerType.value,
                    distribution: 'equal',
                    participants: listParticipantsSelected,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour");
            }

            const data = await response.json();

            console.log("Expense créée avec succès:", data); 
            
            goBack();
            
         }catch (error) {
            console.error("Erreur:", error);
        }    
    };

    const initSelectedParticipant = () => {
        
        listParticipants.value.forEach(participant => {            
            if (typeof participant.selected === 'undefined') {
                participant.selected = false;
            }
        });
    };

    watch(listParticipants, (newValue) => {
      if (newValue.length > 0) {
        const participantExists = newValue.find((participant) => participant.name === userName.value);

        payer.value = participantExists ? userName.value : newValue[0]?.name;
        payerId.value = participantExists ? participantExists.id : newValue[0]?.id;
        payerType.value = participantExists ? participantExists.type : newValue[0]?.type;
      }
    });
    
    watch(payer, (newPayerName) => {
      const selectedParticipant = listParticipants.value.find(
        (participant) => participant.name === newPayerName
      );

      if (selectedParticipant) {
        payerId.value = selectedParticipant.id;
        payerType.value = selectedParticipant.type;
      }
    });
    
    onMounted(() => {
        fetchListParticipant();
        handleResize(); // Vérifie initialement la largeur
        window.addEventListener("resize", handleResize); // Écoute les changements de taille

        if (isWideScreen.value) {
          window.addEventListener("scroll", handleScroll); // Active l'effet parallax
        }
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize); // Nettoie les événements
      window.removeEventListener("scroll", handleScroll); // Nettoie les événements
    });

  </script>

  <style scoped>

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: background-color 0.3s ease;
      z-index: 2;
    }

    .expense-container {
      width: 100%;
      height: 100%;
      background-color: #FFFFFF;
      overflow-y: auto;
    }

    .header {
      position: sticky;
      display: flex;
      padding: 16px 5% 20px 5%;
      width: 90%;
      justify-content: space-between;
      top: 0;
      z-index: 1;
      background-color: #FFFFFF;
    }

    .header > a {
      height: 44px;
    }

    .header > button {
      border: none;
      background-color: transparent;
      font-family: 'General sans';
      font-size: 14px;
      font-weight: 500;
      color: #A8ACB7;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 75%;
      margin: 0 auto;
    }

    h1 {
      font-family: 'General sans';
      font-weight: 500;
      font-size: 32px;
      color: #070303;
      line-height: 28px;
    }

    .label {
      font-family: 'General sans';
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
      width: 100%;
    }

    #payerSelect {
      width: 100%;
      appearance: none;
      cursor: pointer;
    }

    option {
      cursor: pointer;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .input-form, .currency-input {
      width: calc(100% - 30px);
      flex: 0 0 auto;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.05);
      color: #000000;
      margin: 10px 0;
      padding: 16px;
      border: none;
      font-size: 14px;
      font-family: 'General sans';
      font-weight: 400;
    }

    .input-container {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
    }

    .input-container > svg {
      transform: rotate(-90deg);
      right: 12px;
    }

    .currency-input {
      flex: 1;
    }

    .currency-symbol {
      color: #A8ACB7; /* Couleur grisée */
      font-size: 16px;
      margin-left: 8px;
      font-weight: 500;
      font-family: 'General sans';
      position: absolute;
      right: 20px;
    }

    .input-form:focus-visible, .currency-input:focus-visible {
      outline: 1px solid #A8ACB7;
    }

    .dp__main :deep(.dp__outer_menu_wrap) {
      width: 90%;
    }

    .dp__main :deep(.dp__input) {
      height: 50px;
      background-color: rgba(0, 0, 0, 0.05);
      border: none;
      border-radius: 4px;
      font-weight: 400;
      font-size: 14px;
      color: #000;
      font-family: 'Switzer';
      margin: 10px 0;
    }

    .dp__main :deep(.dp__calendar) {
      width: 100%;
      height: 100%;
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

    form > button {
      background-color: #000000;
      width: 100%;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-family: 'General sans';
      font-weight: 500;
      margin: 30px 0px 6px;
      height: 42px;
      cursor: pointer;
    }

    .participant {
      width: calc(100% - 30px);
      border: 1px solid #ebedf2;
      margin-bottom: 8px;
      border-radius: 4px;
      padding: 15px;
    }

    .participant > label {
      margin: 0px;
      font-size: 14px;
    }

    .checkbox-svg > input {
      display: none;
    }

    .checkbox-svg {
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

    .padding-bottom {
      min-height: 200px;
      width: 100%;
      background-color: transparent;
    }

    @media (min-width: 768px) {

      .dp__main :deep(.dp__outer_menu_wrap) {
        width: 450px;
      }

      .logo {
        position: fixed;
        top: 40px;
        left: 0;
        right: 0;
        margin: auto;
      }

      .back {
        position: fixed;
        top: 135px;
        left: calc((100dvw - 750px) / 2);
      }

      .header {
        height: 20px;
        padding: 0px;
      }
    }
  </style>