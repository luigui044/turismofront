<template>
    <div class="px-2">
        <h1 class="edu-au-vic-wa-nt-pre-text" v-if="pais && pais.data">
            {{ pais.data.attributes.titular }}
        </h1>

        <p v-else>Cargando...</p>

        <img :src="banner" alt="banner" class="w-full" style="height: 100px;">

        <div class="grid-nogutter">
            <div class="col-10">
                <template v-if="pais && pais.data">
                    <template v-for="item in pais.data.attributes.historia" :key="item.id">
                        <template v-for="child in item.children" :key="child.id">
                            <p class="text-justify">{{ child.text }}</p>
                        </template>
                    </template>
                </template>
                <ComentariosComponent />
            </div>
            <div class="col-2 px-4">
                <div class="text-center mb-4">
                    <h3 class="mb-3">¿Cómo llegar?</h3>
                    <div class="flex flex-column gap-2">
                        <a href="https://www.waze.com/" target="_blank" class="p-button p-button-info"
                            style="text-decoration: none">
                            <i class="pi pi-map-marker mr-2"></i>
                            Abrir en Waze
                        </a>
                        <a href="https://maps.google.com/" target="_blank" class="p-button p-button-info"
                            style="text-decoration: none">
                            <i class="pi pi-map mr-2"></i>
                            Abrir en Maps
                        </a>
                    </div>
                </div>
                <img :src="bannerVertical" alt="banner" class="w-full h-auto">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { countryServices } from '@/services/api/countryServices';
import banner from '@/assets/adsdefault/banner1.png';
import bannerVertical from '@/assets/adsdefault/bannerVertical1.png';
import ComentariosComponent from '@/components/ComentariosComponent.vue';
const pais = ref(null);

const fetchCountry = async () => {
    try {
        const response = await countryServices.getCountryById(1);
        if (response && response.data) {
            pais.value = response; // La estructura esperada
        } else {
            console.error("Estructura de respuesta inesperada:", response);
            pais.value = { data: { attributes: {} } }; // Evita errores en la plantilla
        }
    } catch (error) {
        console.error("Error al obtener el país:", error);
        pais.value = { data: { attributes: {} } }; // Manejo de error seguro
    }
};

onMounted(() => {
    fetchCountry();
});
</script>
