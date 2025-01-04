<template>

    <div class="grid-nogutter justify-content-left pl-6 text-center  ">

        <template v-for="(oferta, index) in events" :key="index" class="">

            <div class="col-2 ml-3">
                <Card>
                    <template #header>
                        <img alt="oferta"
                            :src="baseUrl + oferta.attributes.imagenes.data[0].attributes.formats.thumbnail.url"
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

                        <Button label="Ver oferta" class="w-full" />

                    </template>
                </Card>
            </div>
        </template>
    </div>

</template>
<script setup>

const baseUrl = import.meta.env.VITE_BASE_URL;

const props = defineProps({
    events: {
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

console.log(props.events)
</script>