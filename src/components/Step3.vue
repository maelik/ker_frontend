<template>
    <div>
      <h2>Quel est ton nom ?</h2>
      <input v-model="formStore.userName" placeholder="Ton nom" />
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
      if (formStore.userName) {
        router.push({ name: 'Step4' });
      } else {
        alert('Veuillez entrer votre nom.');
      }
    };

    const prevStep = () => {
      router.push({ name: 'Step2' });
    };
  </script>
  