<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <router-view />
    </div>
  </header>

  <main>
    
  </main>
</template>

<style scoped>
/* Mobile first */
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

/* Tablette et plus */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    padding: 2rem;
  }
}
</style>
