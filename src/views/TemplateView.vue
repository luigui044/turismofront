<template>

</template>
<script setup>


import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const componentMap = {
    oferta: SectionOfertas,
    eventos: SectionEventos,
};

const CurrentComponent = computed(() => {
    const routeName = route.name?.toLowerCase();
    return componentMap[routeName] || null;
});

</script>