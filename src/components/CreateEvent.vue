<template>
  <div class="container">
    <div class="timeline" ref="timeline">
      <RouterLink class="link" to="/">
        <svg ref="logo" width="89" height="44" viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
          <rect width="89" height="44" rx="21.5235" fill="black"/>
          <path d="M73.4325 16.3495C73.4325 19.9342 70.6603 21.9178 67.1951 22.109L69.7044 28.6093C70.2062 29.8998 71.3534 29.8998 71.9269 29.9476L71.6401 31.0469H67.0756L63.5864 22.1568H62.0569L60.5036 28.2269C60.4319 28.4659 60.408 28.681 60.408 28.8722C60.408 30.0193 61.6029 29.8998 62.1764 29.9715L61.9613 31.0469H54.0988L54.4095 29.9715C54.9592 29.9476 56.5842 29.8042 57.0861 27.7967L60.1212 15.6325C60.1929 15.3696 60.2168 15.1307 60.2168 14.9395C60.2168 13.649 58.998 13.5534 58.4722 13.5534L58.7351 12.4063H66.5737C70.6842 12.4063 73.4325 13.5534 73.4325 16.3495ZM69.7522 16.4451C69.7522 14.7483 68.1271 14.3181 65.8807 14.3181H64.0166L62.5827 20.1971H64.8769C67.8881 20.1971 69.7522 18.8349 69.7522 16.4451Z" fill="white"/>
          <path d="M56.1251 12.4063L56.866 17.1142L55.6472 17.3771L54.8585 15.5369C54.4523 14.581 53.5919 14.0074 51.919 14.0074H48.2148C47.2589 14.0074 46.8526 14.3898 46.5897 15.3935L45.347 20.2688H49.5053C51.3455 20.2688 51.704 19.4085 51.8712 19.05L52.2058 18.3091H53.4963L51.9668 24.2359H50.6763C50.7241 23.973 50.7958 23.5906 50.7958 23.2561C50.7958 22.6108 50.5568 22.0134 49.5531 22.0134H44.893L43.244 28.4898C43.1962 28.6571 43.1723 28.7766 43.1723 28.8961C43.1723 29.374 43.5308 29.5174 44.2955 29.5174H47.6413C50.2701 29.5174 51.7996 28.1552 52.5882 27.3427L54.2133 25.6459L55.0019 26.2195L51.7279 31.0469H36.887L37.1738 29.8998C38.1298 29.8281 39.3486 29.852 39.8026 28.0118L43.005 15.2502C43.0528 15.0351 43.0767 14.8439 43.0767 14.6766C43.0767 13.5534 41.9296 13.6251 41.3799 13.5534L41.5711 12.4063H56.1251Z" fill="white"/>
          <path d="M32.4569 12.4063H40.1282L39.8176 13.5534C39.1484 13.649 38.2403 13.888 36.7347 15.0351L30.0671 20.1015L34.775 28.6571C35.3486 29.6847 36.9737 29.8998 37.6189 29.9476L37.4038 31.0469H28.5137L28.7527 29.9715C29.4218 29.9476 30.8318 29.9715 30.8318 28.9439C30.8318 28.6571 30.7123 28.2747 30.4733 27.8206L27.3666 22.0851L25.8371 23.2561L24.69 27.8684C24.5944 28.203 24.5705 28.4898 24.5705 28.7288C24.5705 30.0193 25.6459 29.9237 26.3151 29.9954L26.1 31.0469H18.2852L18.5003 29.9476C19.289 29.8998 20.7229 29.7325 21.2247 27.7728L24.2598 15.6803C24.2837 15.5369 24.3076 15.4174 24.3076 15.2741C24.3076 13.7924 21.9417 13.649 20.3405 13.649H19.3846C16.3256 13.6729 13.9597 15.2741 13.9597 18.5242C13.9597 19.8625 14.82 21.6071 16.3973 21.6071C17.6639 21.6071 17.6161 20.5317 17.7356 19.5996C17.879 18.5003 18.6198 17.2815 19.9581 17.2815C20.8663 17.2815 21.4398 18.1419 21.4398 19.0022C21.4398 21.2725 19.2651 23.2083 16.7558 23.2083C13.9836 23.2083 12 21.3203 12 18.5959C12 14.581 15.0351 12 19.1695 12C22.2285 12 24.5705 12.4063 27.6534 12.4063H30.7601L30.4733 13.5534C29.5174 13.649 28.2508 13.8163 27.8206 15.5847L26.6018 20.6034L33.15 15.6086C33.6996 15.2024 33.8908 14.8439 33.8908 14.581C33.8908 13.9358 32.8393 13.6251 32.2179 13.5534L32.4569 12.4063Z" fill="white"/>
        </svg>
      </RouterLink>
      <img ref="gradientProgress" :style="{ right: position.x + '%' }" alt="gradient progress" src="/assets/Gradient Progress.png" class="gradient-progress"/>
    </div>

    <div class="form">
      <router-view></router-view>
    </div>

    <img alt="gradient footer" src="/assets/Gradient footer.png" class="gradient-footer" ref="gradientFooter"/>

  </div>
</template>
  
  <script setup >
    import { reactive, watch, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { gsap} from 'gsap';

    const position = reactive({ x: -60 });
    const route = useRoute();
    const logo = ref(null);
    const timeline = ref(null);
    const gradientProgress = ref(null);
    const gradientFooter = ref(null);


    watch(
      () => route.name,
      (newRoute) => {
        switch (newRoute) {
          case 'Step1':
            position.x = 60;
            break;
          case 'Step2':
            position.x = 48;
            break;
          case 'Step3':
            position.x = 36;
            break;
          case 'Step4':
            position.x = 24;
            break;
          case 'Step5':
            position.x = 12;
            break;
          case 'Step6':
            position.x = 0;
            break;
          case 'Step7':
            const timelineMoveLogo = gsap.timeline();

            timelineMoveLogo
              .to(timeline.value,{
                width: '89px',
                height: '44px',
                duration: 0.7,
                ease: 'power2.out',
              },"0")
              .to(gradientProgress.value, {
                opacity: 0,
                duration: 0.3
              },"0")
              .to(logo.value, {
                x: -2,
                duration: 0.3,
              },"0")
              .to(gradientFooter.value, {
                y: 300,
                duration: 0.1,
              },"0")
              break;
        }
      },
      { immediate: true }
    );
    
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.link {
  display: flex;
  align-items: center;
}

.container {
  display: grid;
  grid-template-rows: 20% 80%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.timeline {
  position: relative;
  grid-row: 1;
  height: 50px;
  width: 85%;
  justify-self: center;
  background-color: rgba(0, 0, 0, 0.05);
  margin-top: 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.logo {
  margin-left: 4px;
  z-index: 1;
}

.gradient-progress {
  height: 50px;
  width: 100%;
  position: absolute;
  transition: 0.3s ease-out;
}

.form {
  grid-row: 2;
  justify-self: center;
  height: 100%;
  width: 100%;
}

.gradient-footer {
  position: absolute;
  bottom: -25px;
  left: -45px;
  width: 130%;
  height: auto;
  pointer-events: none;
}

</style>
  
  