<template>
    <div class="grid-nogutter">
        <template v-for="country in countries" :key="country.id">
            <div class="col-3 p-6  text-center">
                <Card class="country-card shadow-8">
                    <template #header class="">
                        <img :src="baseUrl + country?.attributes?.img_miniatura?.data?.attributes?.url"
                            alt="Imagen del país" class="w-full h-8rem object-cover border-round-md" />
                    </template>
                    <template #title>
                        <h3 class="text-xl font-bold m-0">{{ country?.attributes?.nombre }}</h3>
                    </template>
                    <template #content>
                        <Button :label="'Visitar ' + country?.attributes?.nombre" class="p-button-raised p-button-info"
                            @click="router.push(`/${country?.attributes?.slug}`)">
                            <template #icon>
                                <i class="pi pi-map-marker mr-2"></i>
                            </template>
                        </Button>
                    </template>
                </Card>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { countryServices } from '@/services/api/countryServices';

const router = useRouter();
const baseUrl = import.meta.env.VITE_BASE_URL;
interface Country {
    id: number;
    attributes: {
        nombre: string;
        slug: string;
        img_miniatura: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    };
}

const countries = ref<Country[]>([]);

onMounted(async () => {
    const response = await countryServices.getAllCountries();
    countries.value = response.data;
    console.log(countries.value);

});
</script>

<style scoped></style>
