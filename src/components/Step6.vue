<template>
  <div class="container-children">
      <div class="input-container">
        <TransitionForm>
          <div class="centered">
            <h2 :style="{ position: `${inputPositionDOM}`, bottom: `${titlePosition}px` }">Une description</h2>
            <textarea :style="{ position: `${inputPositionDOM}`, bottom: `${inputPosition}px`, width: `${widthInput}%` }" v-model="formStore.description" placeholder="Des besoins ? Un thème? (courses, couchage etc ...)" @blur="resetInputPosition" @focus="focusAction" @keyup.enter="nextStep"></textarea>
          </div>
        </TransitionForm>
      </div>
      <div class="action-container">
        <div class="btn-container" ref="btnContainer" :style="{ paddingBottom: `${buttonOffset}px` }">
          <button class="previous" @click="prevStep">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#FFFFFF"/>
            </svg>
          </button>
          <button class="next enabled" @click="nextStep">Suivant</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';
    import TransitionForm from '@/components/TransitionForm.vue';
    import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
    import { gsap} from 'gsap';

    const formStore = useFormStore();
    const router = useRouter();
    const btnContainer = ref(null);
    const buttonOffset = ref(20);
    const inputPosition = ref(0);
    const titlePosition = ref(0);
    const widthInput = ref(100);
    const inputPositionDOM = ref("relative");

    const resetInputPosition = () => {
      adjustButtonInputPosition();
    };

    const focusAction = () => {
      // Ajuste la hauteur de l'input lorsque l'utilisateur le sélectionne
      adjustButtonInputPosition();
    };

    const adjustButtonInputPosition = () => {
      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;

      if (viewportHeight < windowHeight) {
        const keyboardHeight = windowHeight - viewportHeight;
        buttonOffset.value = keyboardHeight + 20; // Ajoute un espace au-dessus du clavier
        inputPositionDOM.value = "fixed";
        inputPosition.value = keyboardHeight + 83;
        titlePosition.value = keyboardHeight + (window.innerHeight * 0.35) + 103;
        widthInput.value = 75;        
      } else {
        buttonOffset.value = 20; // Réinitialise la position
        inputPosition.value = 0;
        titlePosition.value = 0;
        widthInput.value = 100;
        inputPositionDOM.value = "relative"; 
      }
    };
    

    const nextStep = () => {
      router.push({ name: 'Step7' });
    };

    const prevStep = () => {
      router.push({ name: 'Step5' });
    };

    const timelineAnimationButtons = gsap.timeline();

    onMounted(() => {
      timelineAnimationButtons
        .fromTo(btnContainer.value,{
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
    })

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
  bottom: 20%;
  width: 100%;
  height: auto;
}

.centered > h2 {
  font-family: 'General sans';
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 10px;
}

.centered > textarea {
  width: 100%;
  height: 35vh;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 16px;
  color: #000;
  font-family: 'Switzer';
}

.centered > textarea:focus-visible {
  outline: 1px solid #A8ACB7;
}

.centered > textarea::placeholder {
  font-weight: 400;
  font-size: 16px;
  color: #A8ACB7;
  font-family: 'Switzer';
}

.action-container {
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: relative;
}

.btn-container {
  display: flex;
  width: 90%;
  gap: 10px;
  z-index: 1;
}

.btn-container > .previous {
  width: 46px;
  border: none;
  border-radius: 4px;
  height: 46px;
  background-color: #000;
  cursor: pointer;
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
  height: 46px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}
.btn-container > .enabled{
  background-color: #000;
  color: #fff;
}

</style>
  