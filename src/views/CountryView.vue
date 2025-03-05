<template>
    <div class="px-4">
        <h1 v-if="country">
            {{ country.data.attributes.titular }}
        </h1>
        <p v-else>Cargando...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import countryServices from '@/services/api/countryServices';

const country = ref(null);

onMounted(async () => {
    try {
        country.value = await countryServices.getCountryById(1);
        console.log(country.value);
    } catch (error) {
        console.error("Error al obtener el país:", error);
    }
});
</script>
