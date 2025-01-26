<template>

    <div class="grid-nogutter justify-content-left pl-6 text-center  ">

        <template v-for="(oferta, index) in offerts" :key="index" class="">

            <div class="col-2 ml-3">
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
import { ref } from 'vue';
const title = ref(null)
const baseUrl = import.meta.env.VITE_BASE_URL;


const props = defineProps({
    offerts: {
        type: Array,
        default: null,
    }
})
function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const anio = fechaObj.getFullYear();
    return `${dia}-${mes}-${anio}`;
}

const headerBg = '#e3b505'
const headerColorText = '#fff'
const dialogVisible = ref(false);
const imgEvent = ref()
const fechaIni = ref()
const fechaFin = ref()
const publishedBy = ref()
const descripcionEvento = ref(null);
const eventUrl = ref();


function toggleModal(oferta) {
    dialogVisible.value = true;
    title.value = oferta.nombre_oferta;
    // console.log(oferta)
    imgEvent.value = oferta.imagenes.data[0].attributes.formats.large.url
    descripcionEvento.value = oferta.descripcion[0]?.children[0]?.text
    fechaFin.value = oferta.fecha_final
    fechaIni.value = oferta.fecha_inicio
    publishedBy.value = oferta.empresa.data.attributes.nombre_comercial
    eventUrl.value = oferta.url_evento
}
// console.log(props.offerts)
</script>


<style scoped>
.custoImg {
    border-radius: 25px;
}
</style>