<template>
    <div>
      <h2>Ton email</h2>
      <input v-model="formStore.email" placeholder="email@exemple.fr" type="email" />
      <p>Nous l'utiliserons pour que tu puisses retrouver tes événements en cours</p>
      <button @click="nextStep">Suivant</button>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';

    const formStore = useFormStore();
    const router = useRouter();

    const nextStep = () => {
      if (formStore.email) {
        // Aller à la prochaine étape (Step 2)
        router.push({ name: 'Step2' });
      } else {
        alert('Veuillez entrer un email.');
      }
    };
    
  </script>
  
  