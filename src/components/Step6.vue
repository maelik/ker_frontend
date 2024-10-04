<template>
    <div>
      <h2>Une description, des besoins pour cet événement ?</h2>
      <textarea v-model="formStore.description" placeholder="Raconte-nous tout"></textarea>
      <button @click="prevStep">Précédent</button>
      <button @click="nextStep">C'est parti !</button>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';

    const formStore = useFormStore();
    const router = useRouter();
    

    const nextStep = () => {
      router.push({ name: 'Step7' });
    };

    const prevStep = () => {
      router.push({ name: 'Step5' });
    };
  </script>
  