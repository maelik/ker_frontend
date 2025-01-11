<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const mainClass = computed(() => (route.name !== 'home' ? 'default-styles' : ''));
  

</script>

<template>
  <main :class="mainClass">
    <div class="wrapper">
      <div class="shadow-container"></div>
      <div class="view-container">
          <router-view />
      </div>
    </div>    
  </main>
</template>

<style>
html, body{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
/* Mobile first */

.container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.view-container {
  height: 100dvh;
}

/* Tablette et plus */
@media (orientation: portrait) and (min-width: 768px) and (max-width: 1024px) {
  .default-styles .wrapper {
    background-color: #F5F6F8;
    height: 100dvh;
    width: 100dvw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .default-styles .view-container {
    width: 70dvw;
    height: 80dvh;
    border-radius: 16px;
    margin: 0 auto;
    overflow: hidden;
    clip-path: inset(0 0 0 0 round 16px);
  }

  .default-styles .shadow-container {
    position: absolute;
    width: 70dvw;
    height: 80dvh;
    border-radius: 16px;
    box-shadow: 
    4px 18px 41px rgba(169, 75, 170, 0.1),
    15px 74px 75px rgba(169, 75, 170, 0.09),
    35px 166px 102px rgba(169, 75, 170, 0.05),
    62px 295px 121px rgba(169, 75, 170, 0.01),
    97px 461px 132px rgba(169, 75, 170, 0);
  }
}

@media (orientation: landscape) and (min-width: 768px) {
  .default-styles .wrapper {
    background-color: #F5F6F8;
    height: 100dvh;
    width: 100dvw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .default-styles .view-container {
    width: 40dvw;
    height: 80dvh;
    border-radius: 16px;
    margin: 0 auto;
    overflow: hidden;
    clip-path: inset(0 0 0 0 round 16px);
    position: relative;
  }

  .default-styles .shadow-container {
    position: absolute;
    width: 40dvw;
    height: 80dvh;
    border-radius: 16px;
    box-shadow: 
    4px 18px 41px rgba(169, 75, 170, 0.1),
    15px 74px 75px rgba(169, 75, 170, 0.09),
    35px 166px 102px rgba(169, 75, 170, 0.05),
    62px 295px 121px rgba(169, 75, 170, 0.01),
    97px 461px 132px rgba(169, 75, 170, 0);
  }
}


</style>
