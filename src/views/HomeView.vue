<template>
  <main>
    <div class="grid-nogutter justify-content-center align-center bg-svg">
      <div class="col-8 text-center py-4">
        <p style="font-size: 35px;text-shadow: 6px 4px 20px black; " class="anton-regular  text-white">
          Encuentra más de 40 categoría de empresas
          de
          turismo y afines, <br> para
          que disfrutes los paraísos de El
          Salvador</p>
        <InputText placeholder="Que buscas!" type="text" class="w-full" />

      </div>

    </div>

    <div v-if="posts">

      <SectionBlog :posts="posts" />
    </div>
    <div class="px-8 mt-4">
      <hr>
    </div>
    <SectionLugares />
    <div class="px-8 mt-4">
      <hr>
    </div>
    <div class="grid-nogutter">
      <div class="col-10 text-left py-2 pl-6 my-3">
        <h2 style="text-shadow: 2px 3px 5px black; background-color: #E3B505; display: inline;"
          class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">Ofertas de la Semana</h2>
      </div>
      <div class="col-2  py-2 my-3">
        <router-link to="ofertas">Ver más ofertas...</router-link>
      </div>
    </div>
    <SectionOfertas :offerts="offerts" />
    <div class="px-8 mt-4">
      <hr>
    </div>
    <div class="grid-nogutter">
      <div class="col-10 text-left py-2 pl-6 my-3">
        <h2 style="text-shadow: 2px 3px 5px black; display: inline;"
          class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white event-custom-bg">Próximos eventos</h2>
      </div>
      <div class="col-2  py-2 my-3"> <router-link to="eventos">Ver más eventos...</router-link></div>
    </div>
    <SectionEventos :events="events" />
  </main>


</template>

<script setup lang="ts">
import SectionBlog from '@/components/home/SectionBlog.vue';
import { ref, onMounted } from "vue";
import { postService } from "@/services/api/postService";
import { offertsService } from "@/services/api/ofertService";
import { eventService } from '@/services/api/eventService';
const posts = ref([]);
const offerts = ref([]);
const events = ref([])
const fetchPosts = async () => {
  try {
    const response = await postService.getPostByCategory(1, 4);
    if (response.success) {
      // console.log("Posts obtenidos:", response.data.data); // Verifica los datos obtenidos
      posts.value = response.data.data;
    } else {
      // console.error("Error en la respuesta:", response.message);
    }
  } catch (error) {
    // console.error("Error durante fetchPosts:", error);
  }
};

const fetchOfferts = async () => {
  try {
    const response = await offertsService.getOfferts();
    if (response.success) {

      offerts.value = response?.data?.data || []

      // console.log("Ofertas obtenidas:", response.data.data); // Verifica los datos obt
    }
  } catch (error) {

  }
}

const fetchEvents = async () => {
  try {
    const response = await eventService.getEvents();
    if (response.success) {

      events.value = response?.data?.data || []

      // console.log("Ofertas obtenidas:", response.data.data); // Verifica los datos obt
    }
  } catch (error) {

  }
}


onMounted(() => {

  fetchPosts();
  fetchOfferts();
  fetchEvents();
});

</script>
<style scoped></style>