<script setup lang="ts">
import image from '@/assets/Logo.png';

const props = defineProps({
    customWidth: {
        type: String,
        default: '10rem',
    }
});
</script>

<template>
    <!-- Usar la propiedad 'image' en el atributo src -->
    <router-link to="/">
        <img :src="image" id="logoImg" alt="turismo-mas" :style="{ width: props.customWidth }">
    </router-link>
</template>
