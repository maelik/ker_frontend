<template>
  <div class="container-children">
      <div class="input-container">
        <TransitionForm>
          <div class="centered">
            <h2>Le nom de ton évènement</h2>
            <input v-model="formStore.title" placeholder="Nom de l'événement" />
          </div>
        </TransitionForm>
      </div>
      <div class="action-container">
        <div class="btn-container" ref="btnContainer">
          <button class="previous" @click="prevStep">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#FFFFFF"/>
            </svg>
          </button>
          <button class="next" @click="nextStep" :disabled="isDisabled" :class="{ disabled: isDisabled, enabled: !isDisabled }">Suivant</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
    import TransitionForm from '@/components/TransitionForm.vue';
    import { gsap} from 'gsap';

    const formStore = useFormStore();
    const router = useRouter();
    const btnContainer = ref(null);

    const isDisabled = computed(() => formStore.title.length < 1);

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
    
    const timelineAnimationButtons = gsap.timeline();

    onMounted(() => {
      timelineAnimationButtons
        .fromTo(btnContainer.value,{
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
    justify-content: end;
    padding-bottom: 3dvh;
  }

  .btn-container {
    display: flex;
    width: 90%;
    gap: 10px;
    z-index: 1;
  }

  .btn-container > .previous {
    width: 42px;
    border: none;
    border-radius: 4px;
    height: 42px;
    background-color: #000;
  }

  .btn-container > .previous > svg {
    scale: 0.6;
  }

  .btn-container > .next {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 14px;
    flex-grow: 1;
    border: none;
    border-radius: 4px;
    height: 42px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .btn-container > .enabled{
    background-color: #000;
    color: #fff;
  }
  .btn-container > .disabled{
    background-color: #EBEDF2;
    color: #A8ACB7;
    opacity: 0.5;
    cursor: not-allowed;
  }

</style>