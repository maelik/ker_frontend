<template>
    <transition
      name="form-transition" 
      tag="div"
      appear
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <slot/>
    </transition>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import gsap from 'gsap';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  // Variables de navigation globales
  const isGoingBack = ref(false); // Déterminer si on revient en arrière
  const isLastRoute = ref(false); // Déterminer si c'est la dernière route

  const routeNames = ['Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6', 'Step7'];

  router.beforeEach((to, from, next) => {
    const toIndex = routeNames.indexOf(to.name);
    const fromIndex = routeNames.indexOf(from.name);
    
    const navigationDirection = toIndex < fromIndex;
    
    // Passer la direction comme meta à la route
    to.meta.isGoingBack = navigationDirection;
    
    next();
  });

  
  const beforeEnter =  (el) => { 
    if (isLastRoute.value) return;
    const isGoingBack = route.meta.isGoingBack;    
    gsap.set(el, { x: isGoingBack ? "-100%" : "100%", opacity: 0 });
  };
  
  const enter = (el, done) => {
    if (isLastRoute.value) return;
    gsap.to(el, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out", onComplete: done });
  };
  
  const leave = (el, done) => {
    if (isLastRoute.value) return;
    gsap.to(el, { x: isGoingBack.value ? "100%" : "-100%", opacity: 0, duration: 0.5, ease: "power3.in", onComplete: done });
  };
  </script>