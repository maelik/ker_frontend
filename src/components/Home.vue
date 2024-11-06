<template>
    <div class="home-container">
      <div ref="gradient" class="gradient"></div>
      <img alt="logo ker" src="../assets/logo.png" class="logo"/>
      <div class="container-title">
        <h1>Gère tes invitations</h1>
        <div class="line-carousel">
          <h1>pour</h1>
          <div class="hiddenText">
            <div ref="slider" class="pastille-container">
              <div class="pastille">ta crémaillère</div>
              <div class="pastille">ton anniversaire</div>
              <div class="pastille">halloween</div>
              <div class="pastille">la première raclette</div>
              <div class="pastille">ton réveillon</div>
              <div class="pastille">ta crémaillère</div>
            </div>
          </div>
        </div>
      </div>
      <p class="indication">Juste comme ça.</p>
      <div class="create-event-container">
        <button class="btn-create-event" @click="createEvent">Créer un évènement</button>
        <p @click="showEmailInput">ou retrouve tes évènements déjà créés</p>
      </div>
  
      <div class="email-retrieve-container" ref="containerEmail">
        <button class="exit" @click="hideEmailInput"></button>
        <p>Il nous faut ton email pour retrouver tes évènements</p>
        <div class="input-container">
          <input type="email" v-model="email" id="email" placeholder="exemple@mail.com" class="email-input" />
          <button class="retrieve-events-button" @click="findEvents"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup >
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useUserStore } from '../stores/userStore';
    import { useRouter } from 'vue-router';
    import { gsap} from 'gsap';


    const router = useRouter();
    const userStore = useUserStore();
    const email = ref('');
    const slider = ref(null);
    const gradient = ref(null);
    const containerEmail = ref(null);

    const findEvents = () => {
      if (email.value) {
        userStore.updateEmail(email.value); // On sauvegarde l'email dans le store
        router.push({ name: 'EventList' }); // Redirection vers la page des événements
      } else {
        alert('Veuillez entrer un email');
      }
    };

    const createEvent = () => {
      router.push({ name: 'Step1' }); // Redirection vers le formulaire de création d'événement
    };

    const  showEmailInput = () => {
      const timelineShowInputEmail = gsap.timeline();

      timelineShowInputEmail
        .to(containerEmail.value,{
          y: '-100vh',
          duration: 1,
          ease: 'power4.out',
        })
    }

    const  hideEmailInput = () => {
      const timelineHideInputEmail = gsap.timeline();

      timelineHideInputEmail
        .to(containerEmail.value,{
          y: '100vh',
          duration: 1,
          ease: 'power2.out',
        })
    }

    const timelineSlider = gsap.timeline({ repeat: -1 }); 
    const timelineGradient = gsap.timeline({ repeat: -1 }); 
    const timelineShadow = gsap.timeline({ repeat: -1 }); 

    onMounted(() => {
      document.body.style.overflow = 'hidden';    
  
      timelineSlider
        .to(slider.value, { 
          y: () => -slider.value.offsetHeight + 66 + (slider.value.offsetHeight/6) * 1, 
          duration: 1,
          ease: 'bounce.out',
          delay: 1,
        })
       .to(slider.value, { 
          y: () => -slider.value.offsetHeight + 66 + (slider.value.offsetHeight/6) * 2, 
          duration: 1,
          ease: 'bounce.out',
          delay: 1,
        })
        .to(slider.value, { 
          y: () => -slider.value.offsetHeight + 66 + (slider.value.offsetHeight/6) * 3, 
          duration: 1,
          ease: 'bounce.out',
          delay: 1,
        })
        .to(slider.value, { 
          y: () => -slider.value.offsetHeight + 66 + (slider.value.offsetHeight/6) * 4, 
          duration: 1,
          ease: 'bounce.out',
          delay: 1,
        })
        .to(slider.value, { 
          y: () => -slider.value.offsetHeight + 66 + (slider.value.offsetHeight/6) * 5, 
          duration: 1,
          ease: 'bounce.out',
          delay: 1,
        })

      gsap.set(gradient.value, {
        background: 'radial-gradient(ellipse 200% 120% at top center, #E8F599 30%, #fff 50%)',
        opacity: 0.7,  // Valeur d'opacité initiale
      });    
  
      timelineGradient
        .to(gradient.value, { 
          background: 'radial-gradient(ellipse 200% 120% at top center, #A6D3EE 30%, #fff 50%)', 
          opacity: 0.5, 
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(gradient.value, { 
          background: 'radial-gradient(ellipse 200% 120% at top center, #FFF7D0 30%, #fff 50%)',
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(gradient.value, { 
          background: 'radial-gradient(ellipse 200% 120% at top center, #AE92E466 30%, #fff 50%)', 
          opacity: 0.4,
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(gradient.value, { 
          background: 'radial-gradient(ellipse 200% 120% at top center, #FFE4B7 30%, #fff 50%)', 
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(gradient.value, { 
          background: 'radial-gradient(ellipse 200% 120% at top center, #E8F599 30%, #fff 50%)',
          opacity: 0.7,
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })

      gsap.set(containerEmail.value, {
        boxShadow: '0px 2px 35px 25px rgba(232, 245, 153, 0.7)',
      });    
  
      timelineShadow
        .to(containerEmail.value, {
          boxShadow: '0px 2px 35px 25px rgba(186, 229, 255, 0.5)',
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(containerEmail.value, { 
          boxShadow: '0px 2px 35px 25px rgba(255, 240, 182)',
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(containerEmail.value, {  
          boxShadow: '0px 2px 35px 25px rgba(208, 183, 255, 0.4)',
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(containerEmail.value, {  
          boxShadow: '0px 2px 35px 25px rgba(255, 228, 183)',
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
        .to(containerEmail.value, { 
          boxShadow: '0px 2px 35px 25px rgba(232, 245, 153, 0.7)',
          duration: 1,
          ease: "power1.out",
          delay: 1,
        })
    });

    onBeforeUnmount(() => {
      document.body.style.overflow = '';
      timelineSlider.kill();
      timelineGradient.kill();
      timelineShadow.kill();
    });
    
</script> 
  
<style scoped>
  /* Styles mobile-first */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  .logo {
    position: fixed;
    top: 16px;
  }

  .gradient {
    width: 100%;
    height: 40vh;
    background: radial-gradient(ellipse 200% 120% at top center, #e8f599 30%, #fff 50%);
    z-index: -1;
  }
  
  .container-title {
    height: 100px;
    transform: translateY(-20vw);
  }

  .container-title h1 {
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    margin: 0px;
    font-family: 'General Sans', sans-serif;
  }

  .line-carousel{
    position: relative;
    height: 48px;
  }

  .line-carousel h1 {
    display: inline-block;
  }

  .line-carousel .hiddenText {
    position: absolute;
    top: -4px;
    right: -80px;
    height: 60px;
    width: 100%;
    overflow: hidden;
  }

  .line-carousel .pastille-container {
    display: flex;
    flex-direction: column;
    /* gap: 30px; */
    align-items: flex-start;
    justify-content: flex-end;
    position: absolute;
    transform: translateY(calc(-100% + 66px)); /*74 taille pastille - 8 pour centrer */
    will-change: transform;
  }

  .line-carousel .pastille {
    border-radius: 50px;
    margin: 15px 0;
    padding: 5px 15px;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    flex-shrink: 0;
    white-space: nowrap;
    font-family: 'General sans';
  }

  .pastille:nth-child(1){ 
    background-color: rgba(232, 245, 153, 0.3); 
    border: 1px solid rgba(201, 213, 124, 0.4); 
    color: rgba(109, 119, 54, 1);
  }
  .pastille:nth-child(6){ 
    background-color: rgba(232, 245, 153, 0.3); 
    border: 1px solid rgba(201, 213, 124, 0.4); 
    color: rgba(109, 119, 54, 1);
  }
  .pastille:nth-child(2) { 
    background-color: rgba(255, 228, 183, 0.3);
    border: 1px solid rgba(221, 188, 134, 0.4);
    color: rgba(119, 54, 55, 1);
  }
  .pastille:nth-child(3) { 
    background-color: rgba(208, 183, 255, 0.3); 
    border: 1px solid rgba(174, 146, 228, 0.4);
    color: rgba(95, 54, 119, 1);
  }
  .pastille:nth-child(4) { 
    background-color: rgba(255, 240, 182, 0.3);
    border: 1px solid rgba(235, 219, 160, 0.4);
    color: rgba(119, 95, 54, 1);
  }
  .pastille:nth-child(5) { 
    background-color: rgba(186, 229, 255, 0.3);
    border: 1px solid rgba(166, 211, 238, 0.4);
    color: rgba(54, 87, 119, 1);
  }

  .indication {
    font-family: 'BookmanJFPro Regular', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    transform: translateY(-20vw);
    margin: 14px;
  }
  
  .btn-create-event {
    background-color: #000000;
    color: #ffffff;
    font-family: 'General sans';
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    padding: 0px;
    margin: 0;
    border: none;
    width: 90%;
    height: 7vh;
    cursor: pointer
  }

  .create-event-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  .create-event-container P {
    text-decoration: underline;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    line-height: 26px;
    font-family: 'General sans';
    margin: 14px;
  }
  
  .email-retrieve-container {
    position: absolute;
    bottom: -100vh;
    width: 100%;
    height: 30vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    border-top: 1px solid rgba(0,0,0,0.1);
    border-radius: 24px 24px 0 0;
    box-shadow: 0px 2px 35px 25px rgba(232, 245, 153,0.3);
  }

  .email-retrieve-container .exit{
    background-color: transparent;
    width: 15px;
    height: 15px;
    border-right: 2px solid rgba(0,0,0,0.3);
    border-top: 2px solid rgba(0,0,0,0.3);
    border-bottom: 0;
    border-left: 0;
    transform: rotate(135deg);
    cursor: pointer; 
  }

  .email-retrieve-container p {
    font-family: 'General sans';
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    width: 50%;
    flex: 1;
    margin: 0;
    display: flex;
    align-items: center;
  }
  
  .input-container {
    flex: 1;
    display: inline-block;
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: center
  }
  
  .email-input {
    position: relative;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #EBEDF2;
    border-radius: 4px;
    width: 100%;
    padding: 15px;
  }
  
  .retrieve-events-button {
    position: absolute;
    background-color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 44px;
    height: 36px;
    right: 9%;
  }

  .retrieve-events-button::after{
    content: "";
    display: inline-block;
    width: 11px;
    height: 11px;
    border-right: 2px solid #fff;
    border-top: 2px solid #fff;
    transform: rotate(45deg);
    margin-right: 4px;
    margin-top: 2px;
  }
  
</style>
  