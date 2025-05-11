<template>
    <div class="pb-4">
        <!-- Encabezado dinámico -->
        <div class="grid-nogutter">
            <div class="col-12 text-center py-1 lg:py-2 lg:pl-6 mb-3 "
                :style="{ backgroundColor: route.name === 'ofertas' ? '#E3B505' : '#084c61' }">
                <h1 class="edu-au-vic-wa-nt-pre-text text-3xl lg:text-4xl lg:px-3 py-1 border-round text-white"
                    style="text-shadow: 2px 3px 5px black; display: inline; font-size: 45px;">
                    {{ route.name === 'ofertas' ? 'Ofertas de la semana' : 'Lugares recomendados' }}
                </h1>
            </div>
        </div>

        <!-- Renderiza el componente dinámicamente y pasa solo las props necesarias -->
        <component :is="CurrentComponent" v-bind="componentProps" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { offertsService } from '@/services/api/ofertService';
import { eventService } from '@/services/api/eventService';

// Importar componentes dinámicos
import SectionOfertas from '@/components/home/SectionOfertas.vue';
import SectionEventos from '@/components/home/SectionEventos.vue';

// Obtener la ruta actual
const route = useRoute();

// Mapeo de componentes según la ruta
const componentMap = {
    ofertas: SectionOfertas,
    eventos: SectionEventos,
};

// Computed para el componente dinámico
const CurrentComponent = computed(() => componentMap[route.name] || null);

// Variables reactivas para los datos
const offerts = ref([]);
const events = ref([]);

// Computed para pasar solo las props necesarias
const componentProps = computed(() => {
    return route.name === 'ofertas'
        ? { offerts: offerts.value, orderByCategory: true }
        : { events: events.value, orderByCategory: true };
});

// Función para obtener ofertas
const fetchOfferts = async () => {
    try {
        if (offerts.value.length === 0) { // Evitar llamada innecesaria
            const response = await offertsService.getOfferts();
            if (response.success) {
                offerts.value = response.data.data || [];
                // console.log("Ofertas obtenidas:", offerts.value);
            }
        }
    } catch (error) {
        console.error("Error obteniendo ofertas:", error);
    }
};

// Función para obtener eventos
const fetchEvents = async () => {
    try {
        if (events.value.length === 0) { // Evitar llamada innecesaria
            const response = await eventService.getEvents();
            if (response.success) {
                events.value = response.data.data || [];
                // console.log("Eventos obtenidos:", events.value);
            }
        }
    } catch (error) {
        console.error("Error obteniendo eventos:", error);
    }
};

// Llamar a las funciones cuando el componente se monta
onMounted(() => {
    if (route.name === 'ofertas') {
        fetchOfferts();
    } else if (route.name === 'eventos') {
        fetchEvents();
    }
});
</script>
