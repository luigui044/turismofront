<template>
    <div class="grid-nogutter flex align-items-center justify-content-center">
        <div class="col-12 text-center">
            <img :src="logo" alt="Logo Turismo" class="w-20rem mb-5" />
            <h1 class="text-4xl mb-3 anton-regular text-custom-primary">Sitio en Construcción</h1>
            <p class="text-xl mb-5">Estamos trabajando para brindarte una mejor experiencia</p>
            <i class="pi pi-cog pi-spin" style="font-size: 4rem; color: #084C61;"></i>
        </div>
    </div>
</template>

<script setup>
import logo from '@/assets/logo.png'
</script>

<style scoped>
.text-custom-primary {
    color: #084C61;
}
</style>
