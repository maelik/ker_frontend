import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    email: '',
    title: '',
    userName: '',
    location: '',
    dates: [{ proposed_date: '' }],
    description: '',
  }),
  actions: {
    updateEmail(email) {
      this.email = email;
    },
    updateTitle(title) {
      this.title = title;
    },
    updateUserName(userName) {
      this.userName = userName;
    },
    updateLocation(location) {
      this.location = location;
    },
    updateDates(dates) {
      this.dates = dates;
    },
    updateDescription(description) {
      this.description = description;
    },
  },
});
