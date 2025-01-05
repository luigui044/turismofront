<template>
    <div class=" pb-4">
        <!-- Renderiza el componente dinámicamente -->

        <div class="grid-nogutter">
            <div v-if="route.name === 'ofertas'" class="col-12 text-center py-2 pl-6  mb-3"
                style="background-color: #E3B505">
                <h1 style="text-shadow: 2px 3px 5px black; display: inline; font-size: 45px;"
                    class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">Ofertas de la semana</h1>
            </div>
            <div v-else class="col-12 text-center py-2 pl-6  mb-3" style="background-color: #084c61">
                <h1 style="text-shadow: 2px 3px 5px black; display: inline; font-size: 45px;"
                    class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">Próximos eventos</h1>
            </div>

        </div>
        <component :is="CurrentComponent" :offerts="offerts" :events="events" />
    </div>
</template>
<script setup>


import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { offertsService } from "@/services/api/ofertService";
import { eventService } from '@/services/api/eventService';
// Importa los componentes
import SectionOfertas from '@/components/home/SectionOfertas.vue';
import SectionEventos from '@/components/home/SectionEventos.vue';


const route = useRoute();

const componentMap = {
    ofertas: SectionOfertas,
    eventos: SectionEventos,
};

const CurrentComponent = computed(() => {

    const routeName = route.name?.toLowerCase();
    console.log(componentMap[routeName])

    return componentMap[routeName] || null;
});

// Variables reactivas para datos
const offerts = ref([]);
const events = ref([]);


const fetchOfferts = async () => {
    try {
        const response = await offertsService.getOfferts();
        if (response.success) {

            offerts.value = response?.data?.data || []

            // console.log("Ofertas obtenidas:", response.data.data); // Verifica los datos obt
        }
    } catch (error) {

    }
}

const fetchEvents = async () => {
    try {
        const response = await eventService.getEvents();
        if (response.success) {

            events.value = response?.data?.data || []
        }
    } catch (error) {
    }
}

onMounted(() => {

    if (route.name === 'ofertas') {
        fetchOfferts();
    } else if (route.name === 'eventos') {
        fetchEvents();
    }
});

</script>