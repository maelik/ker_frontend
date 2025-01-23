<template>
  <div class="container-children">
    <div v-if="isDatePickerOpen" class="overlay"></div>
      <div class="input-container">
        <TransitionForm>
          <div class="centered" :style="{ bottom: positionBottom + '%' }">
            <div class="centered-title">
              <h2>Propose plusieurs dates</h2>
            </div>
            <div class="datepicker-container">
              <div v-for="(date, index) in formStore.dates" :key="date.id" class="date-picker-item">
                  <VueDatePicker
                  v-if="date"
                    v-model="tempDates[index]"
                    :placeholder="'Une date'"
                    :format="'dd/MM/yyyy'"
                    :enable-time-picker="false"
                    :class="'custom-datepicker'"
                    teleport-center
                    @open="isDatePickerOpen = true"
                    @blur="isDatePickerOpen = false"
                    ></VueDatePicker>
                    <button @click="deleteDate(index)">
                      <svg v-if="index > 0" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="deleteDate">
                        <path d="M7.08382 11.424C6.95517 11.424 6.82653 11.3766 6.72496 11.275C6.52861 11.0786 6.52861 10.7536 6.72496 10.5573L10.5573 6.725C10.7536 6.52865 11.0786 6.52865 11.275 6.725C11.4713 6.92136 11.4713 7.24636 11.275 7.44271L7.44267 11.275C7.34788 11.3766 7.21246 11.424 7.08382 11.424Z" fill="#A8ACB7"/>
                        <path d="M10.9161 11.424C10.7875 11.424 10.6588 11.3766 10.5573 11.275L6.72496 7.44271C6.52861 7.24636 6.52861 6.92136 6.72496 6.725C6.92132 6.52865 7.24632 6.52865 7.44267 6.725L11.275 10.5573C11.4713 10.7536 11.4713 11.0786 11.275 11.275C11.1734 11.3766 11.0448 11.424 10.9161 11.424Z" fill="#A8ACB7"/>
                        <path d="M11.0313 16.2786H6.96877C3.29221 16.2786 1.72137 14.7078 1.72137 11.0312V6.96875C1.72137 3.29219 3.29221 1.72135 6.96877 1.72135H11.0313C14.7078 1.72135 16.2787 3.29219 16.2787 6.96875V11.0312C16.2787 14.7078 14.7078 16.2786 11.0313 16.2786ZM6.96877 2.73698C3.84742 2.73698 2.737 3.84739 2.737 6.96875V11.0312C2.737 14.1526 3.84742 15.263 6.96877 15.263H11.0313C14.1526 15.263 15.263 14.1526 15.263 11.0312V6.96875C15.263 3.84739 14.1526 2.73698 11.0313 2.73698H6.96877Z" fill="#A8ACB7"/>
                      </svg>
                    </button>
              </div>
            </div>
            <button @click="addDate">Ajouter une date 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" fill="#000000"/>
                <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="#000000"/>
              </svg>
            </button>
          </div>
        </TransitionForm>
      </div>
      <div class="action-container">
        <p>Les participants pourront voter pour leurs dates préférées</p>
        <div class="btn-container" ref="btnContainer">
          <button class="previous" @click="prevStep">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#FFFFFF"/>
            </svg>
          </button>
          <button class="next" @click="nextStep()" :disabled="isDisabled" :class="{ disabled: isDisabled, enabled: !isDisabled }">Suivant</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup >
    import { useFormStore } from '../stores/formStore';
    import { useRouter } from 'vue-router';
    import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
    import VueDatePicker  from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import TransitionForm from '@/components/TransitionForm.vue';
    import { gsap} from 'gsap';

    const formStore = useFormStore();
    const router = useRouter();    
    const nbDates = computed(() => formStore.dates.length);
    const positionBottom = computed(() => Math.max(40 - ((parseInt(nbDates.value) - 1) * 10), 0));

    const isDatePickerOpen = ref(false);
    const btnContainer = ref(null);

    const tempDates = ref(formStore.dates.map(d => d.proposed_date ? new Date(d.proposed_date) : null));
    
    watch(
      () => tempDates.value, // Utilisez une fonction pour observer uniquement les changements de valeur
      (newDates) => {
        formStore.dates = newDates.map(date => ({
          proposed_date: date ? date.toISOString().split('T')[0] : null,
        }));
      },
      { deep: true } // Réduisez la profondeur pour éviter les calculs coûteux
    );

    const isDisabled = computed(() => {      
      const disabled = formStore.dates.length === 0 || formStore.dates.some(date => !date.proposed_date);
           
      return disabled;
    });

    const nextStep = () => {
      router.push({ name: 'Step6' });
    };

    const prevStep = () => {
      router.push({ name: 'Step4' });
    };

    const addDate = () => {    
      formStore.dates = [...formStore.dates, { id: Date.now(), proposed_date: '' }];
      tempDates.value = [...tempDates.value, null];      
    };

    const deleteDate = (index) => {
      formStore.dates.splice(index, 1); // Retirer l'élément de formStore.dates
      tempDates.value.splice(index, 1); // Retirer l'élément correspondant de tempDates
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
}

.container-children {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-container {
  width: 100%;
  align-self: center;
  height: 75%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.date-picker-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  width: 75%;
}

.date-picker-item > button {
  border: none;
  background: transparent;
  position: absolute;
  right: 0px;
  transform: translateX(calc(100% + 10px));
}

.dp__main :deep(.dp__input) {
  height: 53px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 16px;
  color: #000;
  font-family: 'Switzer';
}

.dp__main :deep(.dp__outer_menu_wrap) {
  width: 90%;
}

.dp__main :deep(.dp__calendar) {
  width: 100%;
  height: 100%;
}
.dp__main :deep(.dp__calendar_header_separator) {
  height: 0px;
}
.dp__main :deep(.dp--header-wrap) {
  height: 50px;
}

.dp__main :deep(.dp__action_button) {
  font-family: 'General sans';
  font-size: 12px;
  font-weight: 500;
  padding: 3px 10px;
  height: auto;
}
.dp__main :deep(.dp__action_select) {
  background-color: #000;
}

.dp__main :deep(.dp__theme_light) {
  --dp-primary-color : #000;
}

.centered { 
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered-title {
  width: 75%;
}

.centered > .centered-title > h2 {
  font-family: 'General sans';
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 10px;
}

.centered > button {
  font-family: 'General sans';
  font-weight: 600;
  font-size: 12px;
  border: none;
  background: transparent;
  justify-self: center;
  display: flex;
  padding: 10px;
}

.datepicker-container {
  overflow-y: auto;
  max-height: 55dvh;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-container {
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding-bottom: 3dvh;
  position: relative;
  z-index: 2;
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

@media (orientation: landscape) and (min-width: 768px) {
  .datepicker-container {
    max-height: 40dvh;
  }
}

@media (orientation: portrait) and (min-width: 768px) {
  .datepicker-container {
    max-height: 45dvh;
  }
}

</style>
  