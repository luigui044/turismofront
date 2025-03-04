<template>
    <div class="grid-nogutter  pl-6 text-center">
        <!-- Verifica si la propiedad orderByCategory es true -->
        <template v-if="props.orderByCategory">
            <!-- Itera sobre las categorías agrupadas -->
            <template v-for="(ofertasPorCategoria, categoria) in ofertasPorCategoria" :key="categoria">
                <!-- Mostrar el nombre de la categoría en un h2 -->
                <div class="grid w-full">
                    <div class="col-12">
                        <h2 class="text-xl font-bold mb-3">{{ categoria }}</h2>
                    </div>
                </div>

                <!-- Mostrar ofertas por categoría -->
                <div class="grid justify-content-left">

                    <template v-for="(oferta, index) in ofertasPorCategoria" :key="index">

                        <div class="col-3  px-4 py-2">
                            <Card>
                                <template #header>
                                    <img alt="oferta"
                                        :src="baseUrl + oferta.attributes.imagenes.data[0].attributes.formats.medium.url"
                                        width="100%" />
                                </template>
                                <template #title>{{ oferta.attributes.nombre_oferta }}</template>
                                <template #subtitle>Válido hasta {{ formatearFecha(oferta.attributes.fecha_final)
                                    }}</template>
                                <template #footer>
                                    <Button label="Ver detalles" class="w-full"
                                        @click="toggleModal(oferta.attributes)" />
                                </template>
                            </Card>
                        </div>
                    </template>
                </div>
            </template>
        </template>

        <!-- Si no se agrupan por categoría, mostrar todas las ofertas sin agrupar -->
        <template v-else>
            <div class="grid">
                <template v-for="(oferta, index) in offerts" :key="index">
                    <div class="col-3 px-4 py-2">
                        <Card>
                            <template #header>
                                <img alt="oferta"
                                    :src="baseUrl + oferta.attributes.imagenes.data[0].attributes.formats.medium.url"
                                    width="100%" />
                            </template>
                            <template #title>{{ oferta.attributes.nombre_oferta }}</template>
                            <template #subtitle>Válido hasta {{ formatearFecha(oferta.attributes.fecha_final)
                                }}</template>
                            <template #footer>
                                <Button label="Ver detalles" class="w-full" @click="toggleModal(oferta.attributes)" />
                            </template>
                        </Card>
                    </div>
                </template>
            </div>
        </template>
    </div>

    <!-- Modal de detalles -->
    <ModalComponent v-model:visible="dialogVisible" :title="title" :headerBg="headerBg"
        :headerColorText="headerColorText">
        <template #body>
            <div class="py-2">
                <div class="w-full text-center">
                    <img class="custoImg" alt="" :src="baseUrl + imgEvent" width="300rem" /><br>
                </div>
                <span style="font-size: 11px;">Publicado por: <router-link>{{ publishedBy }}</router-link> </span>
                <p><b>Descripción: </b>{{ descripcionEvento }}</p>
                <p><b>Desde:</b> {{ formatearFecha(fechaIni) }} <b>Hasta:</b> {{ formatearFecha(fechaFin) }}</p>
                <a :href="eventUrl" target="_blank" rel="noopener noreferrer">
                    <Button class="button">Obtener oferta</Button>
                </a>
            </div>
        </template>
    </ModalComponent>
</template>

<script setup>
import ModalComponent from '@/components/ModalComponent.vue';
import { ref, computed, onMounted } from 'vue';

const title = ref(null);
const baseUrl = import.meta.env.VITE_BASE_URL;
const headerBg = '#e3b505';
const headerColorText = '#fff';
const dialogVisible = ref(false);
const imgEvent = ref();
const fechaIni = ref();
const fechaFin = ref();
const publishedBy = ref();
const descripcionEvento = ref(null);
const eventUrl = ref();

const props = defineProps({
    offerts: {
        type: Array,
        default: null,
    },
    orderByCategory: {
        type: Boolean,
        default: false,
    },
});

// Agrupar las ofertas por categoria_turismo solo cuando orderByCategory sea true
const ofertasPorCategoria = computed(() => {
    if (!props.orderByCategory) return {}; // Si orderByCategory es false, no agrupamos

    const agrupado = {};

    props.offerts.forEach(oferta => {
        const categoria = oferta.attributes.empresa.data.attributes.categoria_turismo.data.attributes.nombre || 'Sin Categoría';

        if (!agrupado[categoria]) {
            agrupado[categoria] = [];
        }

        agrupado[categoria].push(oferta);
    });

    return agrupado;
});

function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const anio = fechaObj.getFullYear();
    return `${dia}-${mes}-${anio}`;
}

function toggleModal(oferta) {
    dialogVisible.value = true;
    title.value = oferta.nombre_oferta;
    imgEvent.value = oferta.imagenes.data[0].attributes.formats.large.url;
    descripcionEvento.value = oferta.descripcion[0]?.children[0]?.text;
    fechaFin.value = oferta.fecha_final;
    fechaIni.value = oferta.fecha_inicio;
    publishedBy.value = oferta.empresa.data.attributes.nombre_comercial;
    eventUrl.value = oferta.url_evento;
}
</script>

<style scoped>
.custoImg {
    border-radius: 25px;
}
</style>
