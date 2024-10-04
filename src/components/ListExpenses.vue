<template>
    <div>
      <button @click="$router.back()">← Revenir au tricount </button>
      <h3>Toutes les dépenses</h3>
      <button @click="addExpense">+ Ajouter une dépense</button>
      <div v-for="(expense, index) in expenses" :key="index" class="expenseCard">
        <router-link :to="{ name: 'ExpenseDetails', params: { id,  expenseId : expense.id } }">
          <p>{{ expense.description }} - {{ expense.amount }}€</p>
          <p>ajouté par {{ expense.payerName }}</p>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup> 
    import { useExpensesStore } from '../stores/expenseStore';
    import { useRoute,  } from 'vue-router';
    
    const route = useRoute();
    const id = route.params.id;
    const expenseStore = useExpensesStore();

    const expenses = expenseStore.expenses;
  
    const addExpense = () => {
        console.log("Ajouter une dépense");
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