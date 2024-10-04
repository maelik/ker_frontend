<template>
    <div>
      <h2>Propose plusieurs dates</h2>
      <p>Les participants pourront voter pour leurs dates préférées</p>
      <div v-for="(date, index) in formStore.dates" :key="index">
        <input 
          type="date" 
          v-model="formStore.dates[index].proposed_date" 
          placeholder="Sélectionne une date"
        />
      </div>
      <button @click="addDate">Ajouter une date</button>
      <button @click="prevStep">Précédent</button>
      <button @click="nextStep">Suivant</button>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';

    const formStore = useFormStore();
    const router = useRouter();

    const nextStep = () => {
      router.push({ name: 'Step6' });
    };

    const prevStep = () => {
      router.push({ name: 'Step4' });
    };

    const addDate = () => {
      formStore.dates.push({ proposed_date: '' });
    };
  </script>
  