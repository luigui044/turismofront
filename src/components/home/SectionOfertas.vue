<template>
    <div class="grid-nogutter">
        <div class="col-12 text-center py-2 my-3">
            <h2 style="text-shadow: 2px 3px 5px black; background-color: #E3B505; display: inline;"
                class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">¿Qué quieres hacer
                hoy?</h2>
        </div>
    </div>
    <div class="grid-nogutter justify-content-center text-center  ">

        <template v-for="(oferta, index) in ofertas" :key="index" class="">
            <div class="col-2 ml-3">
                <Card>
                    <template #header>
                        <img alt="user header" :src="Ofertas" width="100%" />
                    </template>
                    <template #title>{{ oferta.titulo }}</template>
                    <template #subtitle>{{ oferta.fecha }}</template>
                    <template #footer>

                        <Button label="Ver oferta" class="w-full" />

                    </template>
                </Card>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Ofertas from '@/assets/ofertas/5.jpg'
const ofertas = [
    { titulo: 'Oferta semanal 1', fecha: 'Válido hasta 00/00/0000' },
    { titulo: 'Oferta semanal 2', fecha: 'Válido hasta 00/00/0000' },
    { titulo: 'Oferta semanal 3', fecha: 'Válido hasta 00/00/0000' },
];
</script>