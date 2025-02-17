<template>
    <div class="container-children">
      <div class="input-container">
        <TransitionForm>
          <div class="centered">
            <h2 :style="{ position: `${inputPositionDOM}`, bottom: `${titlePosition}px` }">Ton email</h2>
            <input v-model="formStore.email" :style="{ position: `${inputPositionDOM}`, bottom: `${inputPosition}px`, width: `${widthInput}%` } " placeholder="email@exemple.fr" type="email" :class="{ invalid: emailError }" @blur="validateEmail" @focus="focusAction" @keyup.enter="nextStep"/>
            <p v-if="emailError" :style="{ position: `${inputPositionDOM}`, bottom: `${textPosition}px` }" class="error-message">{{ emailError }}</p>
          </div>
        </TransitionForm>
      </div>
      <div class="action-container">
        <p>Nous l'utiliserons pour que tu puisses retrouver tes événements en cours</p>
        <button class="next" :style="{ bottom: `${buttonOffset}px` }" @click="nextStep" :disabled="isDisabled" :class="{ disabled: isDisabled, enabled: !isDisabled }" ref="button">Suivant</button>
      </div>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';
    import { computed, onMounted, onUnmounted, onBeforeUnmount, ref } from 'vue';
    import TransitionForm from '@/components/TransitionForm.vue';
    import { gsap} from 'gsap';

    const formStore = useFormStore();
    const router = useRouter();
    const button = ref(null);
    const buttonOffset = ref(20);
    const inputPosition = ref(0);
    const titlePosition = ref(0);
    const textPosition = ref(0);
    const widthInput = ref(100);
    const inputPositionDOM = ref("relative");
    const emailError = ref("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const isDisabled = computed(() => formStore.email.length < 1 || !emailRegex.test(formStore.email));

    const validateEmail = () => {  
      adjustButtonInputPosition();    
       if (!emailRegex.test(formStore.email)) {
        emailError.value = "Veuillez renseigner un format d'email exemple : prenom@gmail.com";
        return false;
      }
      emailError.value = ""; // Pas d'erreur
      return true;
    };

    const focusAction = () => {
      adjustButtonInputPosition();
    };

    const adjustButtonInputPosition = () => {
      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;

      if (viewportHeight < windowHeight) {
        const keyboardHeight = windowHeight - viewportHeight;
        buttonOffset.value = keyboardHeight + 20; // Ajoute un espace au-dessus du clavier
        inputPositionDOM.value = "fixed";
        inputPosition.value = keyboardHeight + 123;
        titlePosition.value = keyboardHeight + 176;
        textPosition.value = keyboardHeight + 80;
        widthInput.value = 75;
        
      } else {
        buttonOffset.value = 20; // Réinitialise la position
        inputPosition.value = 0; // Réinitialise la position
        titlePosition.value = 0;
        textPosition.value = 0;
        widthInput.value = 100;
        inputPositionDOM.value = "relative"; 
      }
    };

    const nextStep = () => {
      if (formStore.email && validateEmail()) {
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
          y: '0px'
        }
      )
      window.visualViewport.addEventListener("resize", adjustButtonInputPosition);
    });

    onUnmounted(() => {
      window.visualViewport.removeEventListener("resize", adjustButtonInputPosition);
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
    height: 100%;
  }

  .input-container {
    width: 75%;
    align-self: center;
    height: 75%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .centered {
    position: absolute;
    bottom: 50%;
    width: 100%;
    height: auto;
  }

  .centered > h2 {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .centered > input {
    width: 100%;
    padding: 16px;
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

  input.invalid {
    outline: 1px solid #EB7A78 !important;
  }

  .error-message {
    position: absolute;
    margin-top: 5px;
    color: #EB7A78;
    font-size: 0.9em;
    font-family: 'General sans';
    font-weight: 400;
  }

  .action-container {
    z-index: 2;
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .action-container > .next {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 14px;
    width: 90%;
    border: none;
    border-radius: 4px;
    height: 46px;
    position: absolute;
    bottom: 20px;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
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
  
  