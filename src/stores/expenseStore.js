// stores/expenses.js
import { defineStore } from 'pinia';

export const useExpensesStore = defineStore('expenses', {

  state: () => ({
    expenses : [],
  }),

  actions: {
    setExpenses(newExpenses) {
      this.expenses = newExpenses;
    },
    updateExpense(updatedExpense) {      
      const index = this.expenses.findIndex(expense => expense.id === updatedExpense.id);
      
      if (index !== -1) {
        this.expenses[index] = updatedExpense;
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'expenseStore',
        storage: localStorage,
      },
    ],
  },
});
