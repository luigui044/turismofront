<template>
    <div class="grid-nogutter mt-6">
        <div class="col-12 text-left pl-6 py-2 my-3">
            <h2 style="text-shadow: 2px 3px 5px black; background-color: #DB504A; display: inline;"
                class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">¿Qué quieres hacer
                hoy?</h2>
        </div>
        <div class="col-12 px-8 text-center margins-btn ">
            <Button outlined class="border-2" raised>
                <img :src="Restaurantes" alt="restaurante" style="width: 8rem;">
                <span>Restaurantes</span>
            </Button>
            <Button outlined class="border-2" raised>
                <img :src="Hoteles" alt="hoteles" style="width: 8rem;"><br>
                <span>Hoteles</span>

            </Button>
            <Button outlined class="border-2" raised>
                <img :src="Turicentros" alt="turicentros" style="width: 8rem;"><br>
                <span>Turicentros</span>
            </Button>
            <Button outlined class="border-2" raised>
                <img :src="CentrosComerciales" alt="centros-comerciales" style="width: 8rem;"><br>
                <span>Centros Comerciales</span>
            </Button>
            <Button outlined class="border-2" raised>
                <img :src="PaquetesTuristicos" alt="paquetes-turisticos" style="width: 8rem;"><br>
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