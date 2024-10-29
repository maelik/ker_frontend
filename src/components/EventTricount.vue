<template>
    <div class="event-details-container">
      <h3>Dernières dépenses</h3>
      <button @click="addExpense">+ Ajouter une dépense</button>
      <div v-for="(expense, index) in recentExpenses" :key="index" class="expenseCard">
        <router-link :to="{ name: 'ExpenseDetails', params: { id,  expenseId : expense.id } }">
          <p>{{ expense.description }} - {{ expense.amount }}€</p>
          <p>ajouté par {{ expense.payerName }}</p>
        </router-link>
      </div>
      <button class="reply-button" @click="findListExpenses()">Voir toutes les dépenses</button>
    </div>

    <div class="event-details-container">
      <h3>Répartition</h3>
        <div v-for="(participant, index) in tabPayParticipant" :key="index" class="expenseCard">
          <p>{{ participant.name }} : {{ participant.pay }}€</p>
        </div>
    </div>

    <div class="event-details-container">
      <h3>Comment équilibrer</h3>
      <ul>
        <li v-for="(balancing, index) in tabBalancing" :key="index">
          <p>{{ balancing.senderName }} → {{ balancing.receiverName }}  {{ balancing.amount }}€</p>
        </li>
      </ul>
    </div>

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
    ? 'http://localhost:3000'
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
            tabBalancing.value = data.balancing;            
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
    .expenseCard {
      border: 1px solid #e0e0e0;
      padding: 5px;
      border-radius: 10px;
      margin-bottom: 10px;
      background-color: #f9f9f9;
    }
  </style>
  