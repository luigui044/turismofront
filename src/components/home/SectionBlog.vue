<template>
    <div class="grid-nogutter px-6">
        <div class="col-12 text-center lg:text-left lg:py-2  my-3 ">
            <h2 style="text-shadow: 2px 3px 5px black; background-color: #56A3A6; display: inline;"
                class="edu-au-vic-wa-nt-pre-text px-2 lg:px-3 py-1 border-round text-white"> Disfruta El Salvador</h2>
        </div>
        <template v-for="post in posts" :key="post.id">
            <div class="col-12 xs:col-12 sm:col-12 md:col-6 lg:col-6 xl:col-3 text-center px-0  lg:px-2 mb-3   ">
                <Card class="shadow-8">
                    <template #title>
                        {{ post.attributes.title }}
                        <br>
                        <span style="font-size:12px">publicado: {{ new
                            Date(post.attributes.publishedAt).toLocaleDateString('es-ES', {
                                year: 'numeric', month:
                                    'long', day: 'numeric'
                            }) }} </span>
                        <br>
                        <span style="font-size:12px">Por: {{ post.attributes.user_published.data.attributes.username }}
                            | <i class="pi pi-comment"></i> {{ post.attributes.post_coments.data.length }}
                        </span>
                    </template>
                    <template #content>
                        <div class="grid justify-content-center">
                            <div class="col-6 md:col-12  text-center ">

                                <img :src="baseUrl + post.attributes.imagen_miniatura.data.attributes.formats.thumbnail.url"
                                    alt="ruta-flores" class="custom-image"><br>
                                <span style="font-size: 12px;"> {{ post.attributes.pie_foto }}</span>
                            </div>

                        </div>


                    </template>
                    <template #footer>
                        <div class="grid">
                            <div class="col-12 xs:col-6 sm:col-6 lg:col-6">
                                <router-link :to="{ name: 'blog', params: { slug: post.attributes.slug } }"
                                    rel="noopener">
                                    <Button label="Leer más" raised icon="pi pi-eye" class="w-full lg:w-auto"></Button>
                                </router-link>
                            </div>
                            <div class="col-12 xs:col-6 sm:col-6 lg:col-6">
                                <Button label="Como llegar" icon="pi pi-map-marker"
                                    class="w-full lg:w-auto p-button-info" @click="openWaze(post.attributes.waze_url)"
                                    raised />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>

        </template>



    </div>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_BASE_URL;

defineProps({
    posts: Array
})

const openWaze = (url) => {
    if (url) {
        window.open(url, '_blank');
    }
}
</script>
<style scoped>
.custom-image {
    width: 269px;
    height: 151px;
}

@media (max-width: 768px) {
    .custom-image {
        width: 240px;
        height: 151px;
    }
}
</style>
