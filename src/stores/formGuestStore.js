import { defineStore } from 'pinia';

export const useFormGuestStore = defineStore('formGuest', {
  state: () => ({
    email: '',
    guestName: '',
    accepted: null,
    responses: [],
  }),
  actions: {
    updateEmail(email) {
      this.email = email;
    },
    updateGuestName(guestName) {
      this.guestName = guestName;
    },
    updateAccepted(accepted) {
      this.accepted = accepted;
    },
    updateResponses(responses) {
      this.responses = responses;
    },
    updateDate(updatedDate) {      
      const index = this.responses.findIndex(response => response.id === updatedDate.id);
      
      if (index !== -1) {
        this.reponses[index] = updatedDate;
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'formGuestStore',
        storage: localStorage,
      },
    ],
  },
});
