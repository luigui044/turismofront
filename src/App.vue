<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue';
import MenuPrincipal from './components/MenuPrincipal.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

const menuId = computed(() => {
  return route.name === 'el-salvador' ? 2 : 1;
});

</script>

<template>
  <header class="custom-header">
    <MenuPrincipal :internacional="menuId" :key="menuId" />
  </header>

  <RouterView />

  <footer>
    <Footer />
  </footer>
</template>
