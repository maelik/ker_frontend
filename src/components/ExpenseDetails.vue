<template>
    <div>
        <button @click="$router.back()">← Revenir au tricount </button>
        <div class="expenseCard">
          <p>{{ expenseInfo.description }} - {{ expenseInfo.amount }}€</p>
          <p>ajouté par {{ expenseInfo.payerName }}</p>
          <p>{{ expenseInfo.date }}</p>
        </div>
        <h3>Participants</h3>
        <div v-for="(participant, index) in expenseInfo.ExpenseParticipants" :key="index">
          <p>{{ participant.participantName }}</p>
        </div>
    </div>
</template>
  
<script setup> 
    import { ref, onMounted } from 'vue';
    import { useExpensesStore } from '../stores/expenseStore';
    import { useRoute } from 'vue-router';

    const error = ref(null);
    const route = useRoute();
    const expenseStore = useExpensesStore();
    const id = route.params.id;
    const expenseId = route.params.expenseId;
    const expenseInfo = ref([]);
    const API_URL = import.meta.env.DEV  
    ? 'http://localhost:3000'
    : import.meta.env.VITE_API_URL;
    

    const fetchInfoExpense = async () => {
        try {
            let apiUrl = `${API_URL}/api/events/${id}/tricount/${expenseId}/infoExpense`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            const data = await response.json();

            expenseStore.updateExpense(data.expense);           

            expenseInfo.value = expenseStore.expenses.find(expense => expense.id === parseInt(expenseId));
            
                        
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        }
    };
        
    onMounted(() => {
        fetchInfoExpense();
    });
    

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