<template>
    <div class="grid-nogutter   text-center">
        <!-- Verifica si la propiedad orderByCategory es true -->
        <template v-if="props.orderByCategory">
            <div class="col-12 lg:col-10">
                <!-- Itera sobre las categorías agrupadas -->
                <template v-for="(oCategoria, categoria, index) in ofertasPorCategoria" :key="categoria">
                    <!-- Mostrar el nombre de la categoría en un h2 -->
                    <div class="grid w-full">
                        <div class="col-12">
                            <h2 style="text-shadow: 2px 3px 5px black; display: inline;"
                                class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white event-custom-bg">{{
                                    categoria }}</h2>

                        </div>
                    </div>

                    <!-- Mostrar ofertas por categoría -->
                    <div class="grid w-full">
                        <div class="col-12">
                            <div class="flex flex-wrap">
                                <template v-for="(oferta, index) in oCategoria" :key="oferta.id || index">
                                    <div :style="isMobile() ? 'width: 100%;' : 'width: 25%;'" class="p-2">
                                        <Card>
                                            <template #header>
                                                <img alt="oferta"
                                                    :src="baseUrl + (oferta?.attributes?.imagenes?.data?.[0]?.attributes?.formats?.medium?.url || '')"
                                                    width="100%" />

                                            </template>
                                            <template #title>{{ oferta?.attributes?.nombre_oferta }}</template>
                                            <template #subtitle>Válido hasta {{
                                                formatearFecha(oferta?.attributes?.fecha_final) }}</template>
                                            <template #footer>
                                                <Button label="Ver detalles" class="w-full"
                                                    @click="toggleModal(oferta?.attributes)" />
                                            </template>
                                        </Card>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <!-- Mostrar banner después del segundo grupo o del primero si no hay segundo -->
                    <div v-if="index === 1 || (index === 0 && Object.keys(ofertasPorCategoria).length === 1)"
                        class="col-12">
                        <img :src="banner" alt="banner" width="100%" class="mb-2" />
                    </div>

                </template>
            </div>
            <div class="col-12 lg:col-2 px-2">

                <img :src="bannerVertical" alt="bannerVertical" width="100%" />

                <ShareSocialComponents />
            </div>
        </template>

        <!-- Si no se agrupan por categoría, mostrar todas las ofertas sin agrupar -->
        <template v-else>
            <div class="grid-nogutter">
                <template v-for="(oferta, index) in offerts" :key="index">
                    <div class="col-12 lg:col-3 px-4 py-2">
                        <Card>
                            <template #header>
                                <img alt="oferta"
                                    :src="baseUrl + (oferta?.attributes?.imagenes?.data?.[0]?.attributes?.formats?.medium?.url || '')"
                                    width="100%" />
                            </template>
                            <template #title>{{ oferta?.attributes?.nombre_oferta }}</template>
                            <template #subtitle>Válido hasta {{ formatearFecha(oferta?.attributes?.fecha_final)
                            }}</template>
                            <template #footer>
                                <Button label="Ver detalles" class="w-full" @click="toggleModal(oferta?.attributes)" />
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
                    <img class="custoImg" alt="" :src="baseUrl + imgEvent" width="100%" /><br>
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
import bannerVertical from '@/assets/adsdefault/bannerVertical1.png';
import banner from '@/assets/adsdefault/banner1.png';
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
        const categoria = oferta?.attributes?.empresa?.data?.attributes?.categoria_turismo?.data?.attributes?.nombre || 'Sin Categoría';

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
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getFullYear();
    return `${dia}-${mes}-${anio}`;
}
function isMobile() {
    return window.innerWidth < 768;
}

function toggleModal(oferta) {
    console.log(oferta);
    dialogVisible.value = true;
    title.value = oferta?.nombre_oferta || '';
    imgEvent.value = oferta?.imagenes?.data?.[0]?.attributes?.formats?.large?.url || '';
    descripcionEvento.value = oferta?.descripcion?.[0]?.children?.[0]?.text || '';
    fechaFin.value = oferta?.fecha_final || '';
    fechaIni.value = oferta?.fecha_inicio || '';
    publishedBy.value = oferta?.empresa?.data?.attributes?.nombre_comercial || '';
    eventUrl.value = oferta?.url_oferta || '';
}

</script>

<style scoped>
:deep(.p-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.p-card-body) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

:deep(.p-card-content) {
    flex-grow: 1;
}

:deep(.p-card-header) {
    height: 200px;
    overflow: hidden;
}

:deep(.p-card-header img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.custoImg {
    border-radius: 25px;
}
</style>
