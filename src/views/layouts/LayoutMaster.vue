<script setup lang="ts">

import MenuPrincipal from '@/components/MenuPrincipal.vue';

const props = defineProps({
    internacional: {
        type: Number,
        default: 1
    }
})


</script>

<template>
    <header class="custom-header">

        <MenuPrincipal :internacional="internacional" :key="internacional" />

    </header>
    <main>
        <slot name="content" />
        <Toast />
    </main>



</template>
