<template>
    <div class="grid-nogutter  px-6">
        <div class="col-12 py-2 my-3">
            <h2 style="text-shadow: 2px 3px 5px black; background-color: #56A3A6; display: inline;"
                class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white"> Disfruta El Salvador</h2>
        </div>
        <template v-for="post in posts" :key="post.id">
            <div class="col-3 text-center px-2">
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
                        <div class="grid">
                            <div class="md:col-12 col-6">
                                <!-- {{
                                    'http://localhost:1337' +
                                    post.attributes.imagen_miniatura.data.attributes.formats.thumbnail.url
                                }} -->
                                <img :src="baseUrl + post.attributes.imagen_miniatura.data.attributes.formats.thumbnail.url"
                                    alt="ruta-flores" style="width: 269px;height: 151px;"><br>
                                <span style="font-size: 12px;"> {{ post.attributes.pie_foto }}</span>
                            </div>
                            <!-- <div class="md:col-7 col-8 justify-content-left">
                                <p class="m-0 text-justify">
                                    {{ post.attributes.descripcion_post }}
                                </p>

                            </div> -->
                        </div>


                    </template>
                    <template #footer>
                        <div>

                            <router-link :to="{ name: 'blog', params: { slug: post.attributes.slug, post: 'algo' } }"
                                rel="noopener">
                                <Button label="Leer más" raised icon="pi pi-eye"></Button>
                            </router-link>
                            <a style="text-decoration: none;" :href="post.attributes.waze_url"
                                class="ml-4 p-button p-button-info" target="_blank" rel="noopener"><span class="pi
                                    pi-map-marker mr-2"></span> Como llegar</a>
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
</script>