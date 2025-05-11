<template>

    <div class="lg:px-2">


        <div class="grid-nogutter">

            <div class="col-12 lg:col-10  px-4 lg:px-6 ">
                <h1 class="playfair-display-bold title-country text-center lg:text-left text-3xl lg:text-4xl"
                    v-if="pais && pais.data">
                    {{ pais.data.attributes.titular }}
                </h1>

                <p v-else>Cargando...</p>

                <img :src="banner" alt="banner" class="w-full" style="height: 100px;">
                <template v-if="pais && pais.data">
                    <template v-for="item in pais.data.attributes.historia" :key="item.id">
                        <template v-for="child in item.children" :key="child.id">
                            <p class="text-justify">{{ child.text }}</p>
                        </template>
                    </template>
                </template>
                <ComentariosComponent :commentsWith="isMobile() ? 'w-8' : 'w-3'" />
            </div>
            <div class="col-12 lg:col-2 px-4">
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
    menuStore.setMenu('nacional');


});
onUnmounted(() => {
    menuStore.setMenu('internacional');
});

function isMobile() {
    return window.innerWidth < 768;
}
</script>


<style>
.title-country {
    font-size: 4rem;
    color: #000;
}
</style>