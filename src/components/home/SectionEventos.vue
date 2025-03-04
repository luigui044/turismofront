<template>

    <div class="grid-nogutter justify-content-center text-center  ">

        <template v-for="(oferta, index) in events" :key="index" class="">

            <div class="col-3 px-4 py-2">
                <Card>
                    <template #header>
                        <img alt="" :src="baseUrl + oferta.attributes.imagenes.data[0].attributes.formats.medium.url"
                            width="100%" />
                    </template>
                    <template #title>{{ oferta.attributes.nombre_evento }}</template>
                    <template #subtitle>
                        <p> desde {{ formatearFecha(oferta.attributes.fecha_inicio)
                        }}</p>
                        <p> hasta {{ formatearFecha(oferta.attributes.fecha_final)
                        }}</p>
                    </template>
                    <template #footer>

                        <Button label="Ver detalles" class="w-full" @click="toggleModal(oferta.attributes)" />

                    </template>
                </Card>
            </div>
        </template>
    </div>
    <ModalComponent v-model:visible="dialogVisible" :title="title" :headerBg="headerBg"
        :headerColorText="headerColorText">
        <template #body>
            <div class="py-2">
                <img alt="" :src="baseUrl + imgEvent" class="custoImg" width="100%" />
                <span style="font-size: 11px;">Publicado por: <router-link>{{ publishedBy }}</router-link> </span>
                <p><b>Descripción: </b>{{ descripcionEvento }}</p>
                <p><b>Desde:</b> {{ formatearFecha(fechaIni) }} <b>Hasta:</b> {{ formatearFecha(fechaFin) }}</p>
                <a :href="eventUrl" target="_blank" rel="noopener noreferrer">
                    <Button class="button">Visitar página del evento</Button>
                </a>

            </div>
        </template>

    </ModalComponent>
</template>
<script setup>
import ModalComponent from '@/components/ModalComponent.vue';
import { ref } from 'vue';


const baseUrl = import.meta.env.VITE_BASE_URL;
const headerBg = '#084c61'
const headerColorText = '#fff'
const eventUrl = ref();
const visible = ref(false);
const title = ref(null);
const descripcionEvento = ref(null);
const props = defineProps({
    events: {
        type: Array,
        default: null,
    },
    orderByCategory: {
        type: Boolean,
        default: false,
    },
})
function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const anio = fechaObj.getFullYear();
    return `${dia}-${mes}-${anio}`;
}
const dialogVisible = ref(false);
const imgEvent = ref()
const fechaIni = ref()
const fechaFin = ref()
const publishedBy = ref()
function toggleModal(oferta) {
    dialogVisible.value = true;
    title.value = oferta.nombre_evento;
    // console.log(oferta)
    imgEvent.value = oferta.imagenes.data[0].attributes.formats.large.url
    descripcionEvento.value = oferta.descripcion[0]?.children[0]?.text
    fechaFin.value = oferta.fecha_final
    fechaIni.value = oferta.fecha_inicio
    publishedBy.value = oferta.empresa.data.attributes.nombre_comercial
    eventUrl.value = oferta.url_evento
}
</script>
<style scoped>
.custoImg {
    border-radius: 25px;
}
</style>