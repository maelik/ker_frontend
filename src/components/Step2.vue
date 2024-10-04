<template>
    <div>
      <h2>Quel est le nom de ton évènement ?</h2>
      <input v-model="formStore.title" placeholder="Nom de l'événement" />
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
      if (formStore.title) {
        router.push({ name: 'Step3' });
      } else {
        alert('Veuillez entrer un nom pour l\'événement.');
      }
    };

    const prevStep = () => {
      router.push({ name: 'Step1' });
    };
  </script>
  