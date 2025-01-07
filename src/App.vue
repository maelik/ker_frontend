<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="view-container">
        <router-view />
      </div>
    </div>
  </header>

  <main>
    
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
}

/* Tablette et plus */
@media (orientation: portrait) and (min-width: 768px) and (max-width: 1024px) {
  .wrapper {
    background-color: #F5F6F8;
    height: 100dvh;
    width: 100dvw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view-container {
    width: 70dvw;
    height: auto;
    border-radius: 16px;
    margin: 0 auto;
    box-shadow: 
    4px 18px 41px rgba(169, 75, 170, 0.1),
    15px 74px 75px rgba(169, 75, 170, 0.09),
    35px 166px 102px rgba(169, 75, 170, 0.05),
    62px 295px 121px rgba(169, 75, 170, 0.01),
    97px 461px 132px rgba(169, 75, 170, 0);
    overflow: hidden;
  }
}

@media (orientation: landscape) and (min-width: 768px) and (max-width: 1024px) {
  .wrapper {
    background-color: #F5F6F8;
    height: 100dvh;
    width: 100dvw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view-container {
    width: 40dvw;
    height: auto;
    border-radius: 16px;
    margin: 0 auto;
    box-shadow: 
    4px 18px 41px rgba(169, 75, 170, 0.1),
    15px 74px 75px rgba(169, 75, 170, 0.09),
    35px 166px 102px rgba(169, 75, 170, 0.05),
    62px 295px 121px rgba(169, 75, 170, 0.01),
    97px 461px 132px rgba(169, 75, 170, 0);
    overflow: hidden;
  }
}


</style>
