<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { postService } from "@/services/api/postService";
import { offertsService } from "@/services/api/ofertService";
import { eventService } from '@/services/api/eventService';
import { useRoute } from "vue-router";
import LayoutMaster from '@/views/layouts/LayoutMaster.vue';
import gadgetsComponent from '@/components/gadgetsComponent.vue';
import SectionPaises from '@/components/home/SectionPaises.vue';


const posts = ref([]);
const offerts = ref([]);
const events = ref([])
const route = useRoute();

const props = defineProps({
  country: {
    type: Number,
    default: 0
  }
})

const fetchPosts = async () => {
  try {
    const response = await postService.getPostByCategory(1, 4);
    if (
      response.success) {
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
  let limitOfferts = 16;
  if (isMobile()) {
    limitOfferts = 4;
  }
  try {
    const response = await offertsService.getOfferts(false, limitOfferts);
    if (response.success) {

      offerts.value = response?.data?.data || []

      // console.log("Ofertas obtenidas:", response.data.data); // Verifica los datos obt
    }
  } catch (error) {

  }
}

const fetchEvents = async () => {
  let limitEvents = 4;
  if (isMobile()) {
    limitEvents = 4;
  }
  try {
    const response = await eventService.getEvents(false, limitEvents);
    if (response.success) {

      events.value = response?.data?.data || []
    }
  } catch (error) {

  }
}

// Definir los componentes asíncronos correctamente
const SectionBlog = defineAsyncComponent(() => import('@/components/home/SectionBlog.vue'))
const SectionOfertas = defineAsyncComponent(() => import('@/components/home/SectionOfertas.vue'))
const SectionEventos = defineAsyncComponent(() => import('@/components/home/SectionEventos.vue'))
const SectionLugares = defineAsyncComponent(() => import('@/components/home/SectionLugares.vue'))

onMounted(() => {

  fetchPosts();
  fetchOfferts();
  fetchEvents();
});


function isMobile() {
  return window.innerWidth <= 768;
}
</script>
<template>
  <LayoutMaster :internacional="route.name === 'home' ? 1 : 2">
    <template #content>

      <div class="grid-nogutter justify-content-center align-center bg-svg">
        <div class="col-12 text-center py-4">
          <p class="anton-regular   px-2 text-white custom-text-slogan">
            Encuentra todos los paraísos turísticos de El Salvador
          </p>
          <InputText placeholder="Que buscas!" type="text" class="w-4" />

        </div>

      </div>
      <SectionPaises v-if="route.name === 'home'" />
      <SectionLugares />

      <div v-if="posts">
        <SectionBlog v-if="route.name === 'home' || route.name === 'el-salvador'" :posts="posts" />
      </div>
      <div class=" px-2 lg:px-8 mt-4">
        <AnuncioBanner />
      </div>
      <div class="grid-nogutter">
        <div class=" col-12 lg:col-10 text-center lg:text-left py-2   lg:pl-6 my-3">
          <h2 style="text-shadow: 2px 3px 5px black; background-color: #E3B505; display: inline;"
            class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white">Ofertas de la Semana</h2>
        </div>
        <div class="col-12 lg:col-2 text-center py-2 my-3">
          <router-link to="ofertas">
            <Button class=" p-button-info text-white hover:text-yellow-300" raised>
              <i class="pi pi-arrow-right mr-2"></i>
              Ver más ofertas...
            </Button>
          </router-link>
        </div>
      </div>
      <SectionOfertas :offerts="offerts" />

      <div class="grid-nogutter">
        <div class="col-12 lg:col-10 text-center lg:text-left py-2   lg:pl-6 my-3">
          <h2 style="text-shadow: 2px 3px 5px black; display: inline;"
            class="edu-au-vic-wa-nt-pre-text px-3 py-1 border-round text-white event-custom-bg">Lugares recomendados
          </h2>
        </div>
        <div class="col-12 lg:col-2 text-center py-2 my-3">
          <router-link to="eventos">
            <Button class=" p-button-info text-white hover:text-yellow-300" raised>
              <i class="pi pi-arrow-right mr-2"></i>
              Ver más lugares...
            </Button>
          </router-link>
        </div>
      </div>
      <SectionEventos :events="events" />

      <gadgetsComponent />

    </template>
  </LayoutMaster>

</template>