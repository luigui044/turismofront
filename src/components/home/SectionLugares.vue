<template>
    <div class="grid-nogutter mt-6">
        <div class="col-12 text-center lg:pl-6 py-2 my-3">
            <h2 style="text-shadow: 2px 3px 5px black; background-color: #DB504A; display: inline;"
                class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">¿Qué quieres hacer
                hoy?</h2>
        </div>
        <div class="col-12   text-center margins-btn ">
            <Button outlined class="border-2 mb-2 xs:mb-4 lg:mb-0" raised>
                <img :src="Restaurantes" class="custom-img-size" alt="restaurante">
                <span>Restaurantes</span>
            </Button>
            <Button outlined class="border-2 mb-2 xs:mb-4 lg:mb-0" raised>
                <img :src="Hoteles" class="custom-img-size" alt="hoteles">
                <span>Hoteles</span>

            </Button>
            <Button outlined class="border-2 mb-2 xs:mb-4 lg:mb-0" raised>
                <img :src="Turicentros" class="custom-img-size" alt="turicentros">
                <span>Turicentros</span>
            </Button>
            <Button outlined class="border-2 mb-2 xs:mb-4 lg:mb-0" raised>
                <img :src="CentrosComerciales" class="custom-img-size" alt="centros-comerciales">
                <span>Centros Comerciales</span>
            </Button>
            <Button outlined class="border-2 mb-2 xs:mb-4 lg:mb-0" raised>
                <img :src="PaquetesTuristicos" class="custom-img-size" alt="paquetes-turisticos">
                <span>Paquetes Turisticos</span>
            </Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import Restaurantes from '@/assets/lugares/restaurante.png';
import Hoteles from '@/assets/lugares/hotel.png';
import Turicentros from '@/assets/lugares/campamento.png';
import CentrosComerciales from '@/assets/lugares/mapa.png';
import PaquetesTuristicos from '@/assets/lugares/reserva.png';

</script>

<style scoped>
.custom-img-size {
    width: 8rem;
}

@media (max-width: 1302px) {}

@media (max-width: 1400px) {
    .custom-img-size {
        width: 2rem;
    }

    .margins-btn .p-button {
        margin-right: 11px !important;
        width: 230px !important;
    }
}
</style>
