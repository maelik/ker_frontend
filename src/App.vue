<template>
  <main :class="mainClass">
    <div class="wrapper" :class="wrapperClass">
      <div :class="positionCentral" class="divCentral">
        <div :class="positionShadow" class="shadow-container"></div>
        <div :class="clipClass, positionView" class="view-container">
            <router-view />
        </div>
      </div>
    </div>    
  </main>
</template>

<script setup>
  import { computed, } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const mainClass = computed(() => {
    
    if(/* route.name !== 'home' ||*/ route.name !== 'NotFound' ) {
      return 'default-styles';
    }
    return ''
  });

  const clipClass = computed(() => {
    if (route.name === 'Step7' || route.name === 'InvitationGuest') {
      return 'clip-class';
    }
    return '';
  });

  const positionCentral = computed(() => {
    if (route.name === 'home' || route.matched.some(r => r.name === 'CreateEvent') || route.name === 'InvitationGuest') {
      return 'centered';
    }
    return 'margin';
  });

  const positionShadow = computed(() => {
    if (route.name === 'home' || route.matched.some(r => r.name === 'CreateEvent') || route.name === 'InvitationGuest') {
      return 'centered';
    }
    return 'scroll';
  });

  const positionView = computed(() => {
    if (route.name === 'home' || route.matched.some(r => r.name === 'CreateEvent') || route.name === 'InvitationGuest') {
      return 'centered';
    }
    return 'scroll';
  });

  const wrapperClass = computed(() => {
    if (route.name === 'home' || route.matched.some(r => r.name === 'CreateEvent') || route.name === 'InvitationGuest' || route.name === 'NotFound') {
      return 'fix';
    }
    return 'auto';
  });
  

</script>

<style>
html, body{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
/* Mobile first */

.default-styles {
  overflow: hidden;
}

.wrapper {
  background-color: #F5F6F8;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.divCentral {
  position: relative;
}

.shadow-container {
  position: fixed;
}

.view-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Tablette et plus */
@media (orientation: portrait) and (min-width: 768px) and (max-width: 1024px) {
  .default-styles .wrapper {
    background-color: #F5F6F8;
    width: 100dvw;
    overflow-y: auto;
    display: flex;    
    flex-direction: column;
    align-items: center;
  }

  .default-styles .view-container {
    width: 500px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }

  .clip-class {
    clip-path: inset(0 0 0 0 round 16px);
  }

  .default-styles .shadow-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    border-radius: 16px;
    box-shadow: 
    4px 18px 41px rgba(169, 75, 170, 0.1),
    15px 74px 75px rgba(169, 75, 170, 0.09),
    35px 166px 102px rgba(169, 75, 170, 0.05),
    62px 295px 121px rgba(169, 75, 170, 0.01),
    97px 461px 132px rgba(169, 75, 170, 0);
  }

  .centered {
    height: 660px;
  }

  .scroll {
    height: auto;
  }
  
  .default-styles .margin {
    margin: 135px 0px;
  }

  .fix {
    height: 100dvh;
    justify-content: center;
  }

  .auto {
    height: auto;
  }
}

@media (orientation: landscape) and (min-width: 768px) {
  .default-styles .wrapper {
    background-color: #F5F6F8;
    width: 100dvw;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .default-styles .view-container {
    width: 500px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }

  .clip-class {
    clip-path: inset(0 0 0 0 round 16px);
  }

  .default-styles .shadow-container {
    position: absolute;
    width: 500px;
    border-radius: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 
    4px 18px 41px rgba(169, 75, 170, 0.1),
    15px 74px 75px rgba(169, 75, 170, 0.09),
    35px 166px 102px rgba(169, 75, 170, 0.05),
    62px 295px 121px rgba(169, 75, 170, 0.01),
    97px 461px 132px rgba(169, 75, 170, 0);
  }

  .centered {
    height: 660px;
  }

  .scroll {
    height: auto;
  }

  .default-styles .margin {
    margin: 135px 0px;
  }

  .fix {
    height: 100dvh;
    justify-content: center;
  }

  .auto {
    height: auto;
  }
}


</style>
