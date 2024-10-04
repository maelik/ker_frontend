<template>
    <div>
      <h2>Où se passe l'évènement ?</h2>
      <input v-model="formStore.location" placeholder="Adresse de l'évènement" />
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
      if (formStore.location) {
        router.push({ name: 'Step5' });
      } else {
        alert('Veuillez entrer une adresse.');
      }
    };

    const prevStep = () => {
      router.push({ name: 'Step3' });
    };
  </script>
  