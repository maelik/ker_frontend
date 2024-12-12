<template>
    <div class="info-container">
      <div class="line"></div>
      <span class="info-text">Kercount</span>
      <div class="line"></div>
    </div>

    <div class="event-kercount-container">
      <h1>Dernières dépenses</h1>
      <div v-for="(expense, index) in recentExpenses" :key="index" class="expenseCard">
        <router-link :to="{ name: 'ExpenseDetails', params: { id,  expenseId : expense.id } }">
          <div class="description">
            <h3>{{ expense.description }}</h3>
            <p>ajouté par {{ expense.payerName }}</p>
          </div>
          <div class="price">
            {{ expense.amount }}€
          </div>
        </router-link>
      </div>
      <button class="reply-button" @click="findListExpenses()">Voir toutes les dépenses</button>
    

      <div class="repartition-container">
        <h1>Répartition</h1>
          <div v-for="(participant, index) in tabPayParticipant" :key="index" class="repartitionCard">
            <svg v-if="participant.pay > 0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="add-square">
              <path d="M10.6666 8.5H5.33331C5.05998 8.5 4.83331 8.27333 4.83331 8C4.83331 7.72667 5.05998 7.5 5.33331 7.5H10.6666C10.94 7.5 11.1666 7.72667 11.1666 8C11.1666 8.27333 10.94 8.5 10.6666 8.5Z" fill="#131313"/>
              <path d="M8 11.1667C7.72667 11.1667 7.5 10.94 7.5 10.6667V5.33334C7.5 5.06 7.72667 4.83334 8 4.83334C8.27333 4.83334 8.5 5.06 8.5 5.33334V10.6667C8.5 10.94 8.27333 11.1667 8 11.1667Z" fill="#131313"/>
              <path d="M9.99998 15.1667H5.99998C2.37998 15.1667 0.833313 13.62 0.833313 10V6C0.833313 2.38 2.37998 0.833336 5.99998 0.833336H9.99998C13.62 0.833336 15.1666 2.38 15.1666 6V10C15.1666 13.62 13.62 15.1667 9.99998 15.1667ZM5.99998 1.83334C2.92665 1.83334 1.83331 2.92667 1.83331 6V10C1.83331 13.0733 2.92665 14.1667 5.99998 14.1667H9.99998C13.0733 14.1667 14.1666 13.0733 14.1666 10V6C14.1666 2.92667 13.0733 1.83334 9.99998 1.83334H5.99998Z" fill="#131313"/>
            </svg>

            <svg v-if="participant.pay < 0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="less-square">
              <path d="M10.6666 8.5H5.33331C5.05998 8.5 4.83331 8.27333 4.83331 8C4.83331 7.72667 5.05998 7.5 5.33331 7.5H10.6666C10.94 7.5 11.1666 7.72667 11.1666 8C11.1666 8.27333 10.94 8.5 10.6666 8.5Z" fill="#131313"/>
              <path d="M9.99998 15.1667H5.99998C2.37998 15.1667 0.833313 13.62 0.833313 10V6C0.833313 2.38 2.37998 0.833336 5.99998 0.833336H9.99998C13.62 0.833336 15.1666 2.38 15.1666 6V10C15.1666 13.62 13.62 15.1667 9.99998 15.1667ZM5.99998 1.83334C2.92665 1.83334 1.83331 2.92667 1.83331 6V10C1.83331 13.0733 2.92665 14.1667 5.99998 14.1667H9.99998C13.0733 14.1667 14.1666 13.0733 14.1666 10V6C14.1666 2.92667 13.0733 1.83334 9.99998 1.83334H5.99998Z" fill="#131313"/>
            </svg>
            <h3 class="name">
              {{ participant.name }}
            </h3>
            <div class="pay">{{ participant.pay }}€</div>
          </div>
      </div>

      <div class="repartition-container">
        <h1>Comment équilibrer</h1>
          <div v-for="(balancing, index) in tabBalancing" :key="index" class="repartitionCard">
            <h3 class="name">{{ balancing.senderName }}</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#131313"/>
            </svg>
            <h3 class="name">{{ balancing.receiverName }}</h3> 
            <div class="pay">{{ balancing.amount }}€</div>
          </div>
      </div>

    </div>

    <button @click="addExpense" class="btnAdd">Ajouter une dépense</button>
    <div class="padding-bottom"></div>

  </template>
  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useExpensesStore } from '../stores/expenseStore';
    import { useRoute, useRouter } from 'vue-router';

    // Importation des props
    const props = defineProps({
      event: {
        type: Object
      }
    });

    const error = ref(null);
    const route = useRoute();
    const router = useRouter();
    const expenseStore = useExpensesStore();
    const recentExpenses = ref([]);
    const tabPayParticipant = ref([]);
    const tabBalancing = ref([]);
    const id = route.params.id;
    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;

    const findListExpenses = () => {
      router.push({ name: 'ListExpenses', params: { id: route.params.id } });
    };

    const fetchListExpenses = async () => {
        try {
            let apiUrl = `${API_URL}/api/events/${route.params.id}/tricount/listExpenses`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            const data = await response.json();
            expenseStore.setExpenses(data.expenses);
            // Limite à 3 dépenses sur la page principale
            recentExpenses.value = expenseStore.expenses.slice(0, 3);
            
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        }
    };

    const fetchTabPayParticipant = async () => {
        try {
            let apiUrl = `${API_URL}/api/events/${route.params.id}/tricount/payParticipant`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            const data = await response.json();
            tabPayParticipant.value= data.tabPayParticipant; 
            tabPayParticipant.value.forEach(participant => {            
              participant.pay = participant.pay > 0 ? `+${participant.pay}` : `${participant.pay}`;
            });
                     
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        }
    };

    const fetchBalancing = async () => {
        try {
            let apiUrl = `${API_URL}/api/events/${route.params.id}/tricount/balancing`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            const data = await response.json();
            tabBalancing.value = data.listBalancing;            
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        }
    };
        
    onMounted(() => {
      fetchListExpenses();
      fetchTabPayParticipant();
      fetchBalancing();
    });

    const addExpense = () => {
      router.push({name:'createExpense'});
    };
  </script>
  
  <style scoped>
    .event-kercount-container {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      padding-top: 20px;
      width: 75dvw;
      margin: 0 auto;
    }

    h1 {
      font-family: 'General sans';
      font-size: 28px;
      font-weight: 500;
      color: #070303;
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

    .expenseCard {
      border: 1px solid #ebedf2;
      padding: 15px 25px;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .expenseCard > a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .description {
      flex-grow: 2;
    }

    .description > h3 {
      font-family: 'General sans';
      font-weight: 500;
      font-size: 16px;
      color: #1A1A39;
      margin: 0px 0px 5px 0px;
    }

    .description > p {
      font-family: 'General sans';
      font-weight: 500;
      font-size: 11px;
      color: #797E9E;
      margin: 0px;
      line-height: 16px;
    }

    .price {
      display: flex;
      justify-content: end;
      flex-grow: 1;
      font-family: 'BookmanJFPro Regular';
      font-weight: 400;
      font-size: 18px;
      color: #131313;
      font-style: italic;
    }

    .reply-button {
      background-color: #ffffff;
      color: #a8acb7;
      border-radius: 4px;
      border: 1px solid #ebedf2;
      padding: 10px;
    }

    .repartition-container {
      padding-top: 20px;
    }

    .repartitionCard {
      border: 1px solid #ebedf2;
      padding: 15px 25px;
      border-radius: 4px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }

    #add-square, #less-square {
      padding-right: 0px;
    }

    .repartitionCard > svg {
      transform: rotate(180deg);
      padding: 0px 10px;
    }

    .repartitionCard > .name {
      margin: 0px;
      font-family: 'General sans';
      font-size: 16px;
      font-weight: 500;
      color: #1A1A39;
      line-height: 16px;
    }

    .repartitionCard > .pay {
      margin: 0px;
      display: flex;
      justify-content: end;
      flex-grow: 1;
      font-family: 'BookmanJFPro Regular';
      font-weight: 400;
      font-size: 18px;
      color: #131313;
      font-style: italic;
      align-items: center;
      padding-bottom: 2px;
    }

    .btnAdd {
      position: fixed;
      bottom: 68px;
      height: 50px;
      width: 96dvw;
      left: 50%;
      transform: translateX(-50%);
      border: none;
      border-radius: 4px;
      background-color: #131313;
      font-family: 'General sans';
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
    }

    .padding-bottom {
      min-height: 200px;
      width: 100%;
      background-color: transparent;
    }
  </style>
  