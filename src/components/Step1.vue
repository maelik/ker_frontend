<template>
    <div class="container-children">
      <div class="input-container">
        <TransitionForm>
          <div class="centered">
            <h2>Ton email</h2>
            <input v-model="formStore.email" placeholder="email@exemple.fr" type="email" />
          </div>
        </TransitionForm>
      </div>
      <div class="action-container">
        <p>Nous l'utiliserons pour que tu puisses retrouver tes événements en cours</p>
        <button class="next" @click="nextStep" :disabled="isDisabled" :class="{ disabled: isDisabled, enabled: !isDisabled }" ref="button">Suivant</button>
      </div>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';
    import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
    import TransitionForm from '@/components/TransitionForm.vue';
    import { gsap} from 'gsap';

    const formStore = useFormStore();
    const router = useRouter();
    const button = ref(null);
    
    const isDisabled = computed(() => formStore.email.length < 1);

    const nextStep = () => {
      if (formStore.email) {
        // Aller à la prochaine étape (Step 2)
        router.push({ name: 'Step2' });
      } else {
        alert('Veuillez entrer un email.');
      }
    };

    const timelineAnimationButtons = gsap.timeline();

    onMounted(() => {
      timelineAnimationButtons
        .fromTo(button.value,{
          y: '100px',
        },{
          delay: 0.5,
          duration: 0.3,
          y: 'Opx'
        }
      )
    });

    onBeforeUnmount(() => {
      timelineAnimationButtons.kill();
    });
    
  </script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container-children {
    display: flex;
    flex-direction: column;
    height: 80dvh;
  }

  .input-container {
    width: 75%;
    align-self: center;
    height: 60dvh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .centered {
    position: absolute;
    bottom: 50%;
    width: 100%;
  }

  .centered > h2 {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .centered > input {
    width: 100%;
    height: 8vh;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.05);
    border: none;
    border-radius: 4px;
    font-weight: 400;
    font-size: 16px;
    color: #000;
    font-family: 'Switzer';
  }
  .centered > input:focus-visible {
    outline: 1px solid #A8ACB7;
  }

  .centered > input::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: #A8ACB7;
    font-family: 'Switzer';
  }

  .action-container {
    width: 100dvw;
    height: 20dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .action-container > .next {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 14px;
    width: 90%;
    border: none;
    border-radius: 4px;
    height: 42px;
    position: absolute;
    bottom: 3dvh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .action-container > .enabled{
    background-color: #000;
    color: #fff;
  }
  .action-container > .disabled{
    background-color: #EBEDF2;
    color: #A8ACB7;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .action-container > p {
    text-align: center;
    color: #969696;
    font-weight: 400;
    font-style: italic;
    font-size: 12px;
    line-height: 12px;
    font-family: 'BookmanJFPro Regular';
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70px;
  }

</style>
  
  