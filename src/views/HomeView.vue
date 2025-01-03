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

    <div v-if="postElSalvador">

      <SectionBlog :posts="postElSalvador" />
    </div>

    <SectionLugares />
    <SectionOfertas />
  </main>
</template>

<script setup lang="ts">
import SectionBlog from '@/components/home/SectionBlog.vue';
import SectionLugares from '@/components/home/SectionLugares.vue';
import SectionOfertas from '@/components/home/SectionOfertas.vue';
import { ref, onMounted } from "vue";
import { postService } from "@/services/api/postService";

const postElSalvador = ref(null);

const fetchPosts = async () => {
  console.log('entra')
  try {
    const response = await postService.getPostByCategory(1, 4);
    if (response.success) {
      console.log("Posts obtenidos:", response.data.data); // Verifica los datos obtenidos
      postElSalvador.value = response.data.data;
    } else {
      console.error("Error en la respuesta:", response.message);
    }
  } catch (error) {
    console.error("Error durante fetchPosts:", error);
  }
};

onMounted(() => {
  console.log('entra2')
  fetchPosts();
});

</script>
<style scoped></style>