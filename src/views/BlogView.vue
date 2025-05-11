<template>

    <!-- Renderiza solo si `post` tiene un valor -->
    <div class="px-1 lg:px-2" style="margin: 0;">


        <h1 v-if="post">{{ post.attributes.title }}</h1>
        <p v-else>Cargando...</p>
        <img :src="banner" alt="banner" class="w-full" style="height: 100px;">

        <div class="grid-nogutter">

            <div class="col-12 lg:col-10">
                <div class="card  text-center">

                    <div v-if="images.length" class="justify-content-center">
                        <!-- Galería -->
                        <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5"
                            containerStyle="max-width:100%">
                            <template #item="slotProps">
                                <img :src="slotProps.item.url ? slotProps.item.url : 'fail/src'"
                                    :alt="slotProps.item.hash" style="width: 100%; height: 550px;" />
                            </template>
                            <template #thumbnail="slotProps">
                                <img :src="slotProps.item.thumbnail" :alt="slotProps.item.hash"
                                    style="width: 10rem !important; height: 5rem;" />
                            </template>
                        </Galleria>
                    </div>
                    <p v-else>No hay imágenes para mostrar.</p>
                </div>


                <div v-if="post" class="text-justify ">
                    <div v-for="(contentItem, index) in post.attributes.content" :key="index">
                        <p v-for="(childrenText, indexChild) in contentItem.children">
                            {{ childrenText.text }}
                        </p>
                    </div>
                </div>
                <ComentariosComponent :commentsWith="isMobile() ? 'w-6' : 'w-3'" />

            </div>
            <div class="col-12 lg:col-2 px-4 pt-4 mt-2 ">
                <a v-if="post" style="text-decoration: none;" :href="post.attributes.waze_url"
                    class="w-full block text-center p-button p-button-info" target="_blank" rel="noopener"><span
                        class="pi pi-map-marker mr-2"></span> Como llegar
                </a>
                <ShareSocialComponents />
                <img :src="bannerVertical" alt="banner" class="w-full h-auto mt-2 lg:mt-0">
            </div>
        </div>

    </div>



</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { postService } from "@/services/api/postService";
import ComentariosComponent from "@/components/ComentariosComponent.vue";
import banner from '@/assets/adsdefault/banner1.png';
import bannerVertical from '@/assets/adsdefault/bannerVertical1.png';
const props = defineProps({
    slug: String
});
const post = ref(null); // Inicializa como `null` para manejar el estado inicial de carga
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);


function isMobile() {
    return window.innerWidth < 768;
}

// Computed para transformar los datos multimedia en el formato esperado por Galleria
const images = computed(() => {
    const backendUrl = import.meta.env.VITE_BASE_URL;

    if (!post.value?.attributes?.multimedia?.data) return []; // Si no hay datos, devolver un array vacío

    return post.value.attributes.multimedia.data.map((item, index) => {
        // Utiliza JSON.stringify para obtener una copia "normal" del objeto y evitar el proxy
        const itemData = JSON.parse(JSON.stringify(item));

        // Verificar la estructura del objeto real

        const formats = itemData.attributes?.formats || {};
        const medium = formats.medium || {};
        const thumbnail = formats.thumbnail || {};



        return {
            url: medium.url ? `${backendUrl}${medium.url}` : '', // Asegurar que la URL sea válida
            thumbnail: thumbnail.url ? `${backendUrl}${thumbnail.url}` : '',
            hash: itemData.attributes?.hash || '', // Asegurar que hash esté disponible
        };
    });
});


const getPost = async () => {
    try {
        const response = await postService.getPostBySlug(props.slug);
        if (response.success) {
            post.value = response.data.data[0];


        } else {
            console.error("Error en la respuesta:", response.message);
        }
    } catch (error) {
        console.error("Error durante fetchPosts:", error);
    }
};

onMounted(() => {
    getPost();
});
</script>

<style></style>