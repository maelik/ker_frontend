// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    token: '',
    name: '',
    userId: null,
    eventsCreated: [],
    eventsInvited: [],
  }),
  actions: {
    updateEmail(newEmail) {
      this.email = newEmail;
    },
    updateToken(newToken) {
      this.token = newToken;
    },
    updateName(newName) {
      this.name = newName;
    },
    updateId(newId) {
      this.userId = newId;
    },
    updateEventsCreated(events) {
      this.eventsCreated = events;
    },
    updateEventsInvited(events) {
      this.eventsInvited = events;
    },
    resetListEvents() {
      this.eventsCreated = [];
      this.eventsInvited = [];
    },
    resetStore() {
      this.$reset();
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'userStore',
        storage: localStorage,
      },
    ],
  },
});
