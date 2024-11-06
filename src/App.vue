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

<style>
html, body{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
/* Mobile first */

.container {
  display: flex;
  flex-direction: column;
}

/* Tablette et plus */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    padding: 2rem;
  }
}
</style>
