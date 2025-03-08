<template>
    <div class="mt-4 mb-4">
        <h3 class="mb-3">Deja tu comentario</h3>
        <div class="flex flex-column gap-3">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <input type="text" v-model="nombreComentario" class="p-inputtext" placeholder="Tu nombre">
            </div>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <input type="email" v-model="emailComentario" class="p-inputtext" placeholder="Tu email">
            </div>
            <textarea v-model="textoComentario" rows="5" class="p-inputtextarea"
                placeholder="Escribe tu comentario"></textarea>
            <Button label="Enviar comentario" icon="pi pi-send" @click="enviarComentario" :class="props.commentsWith" />
        </div>

        <!-- Lista de comentarios -->
        <div class="mt-4">
            <div v-for="(comentario, index) in comentarios" :key="index" class="p-3 border-round mb-3"
                style="background-color: #f8f9fa;">
                <div class="flex align-items-center mb-2">
                    <i class="pi pi-user mr-2"></i>
                    <span class="font-bold">{{ comentario.nombre }}</span>
                    <span class="text-500 ml-2">{{ comentario.fecha }}</span>
                </div>
                <p class="m-0">{{ comentario.texto }}</p>
            </div>
        </div>
        <div class="mt-4 flex justify-content-between">
            <div class="flex gap-2">
                <Button icon="pi pi-facebook" class="p-button-rounded p-button-info bg-blue-500"
                    @click="compartirEnFacebook" />
                <Button icon="pi pi-twitter" class="p-button-rounded p-button-info" @click="compartirEnTwitter" />
                <Button icon="pi pi-whatsapp" class="p-button-rounded p-button-success" @click="compartirEnWhatsapp" />
            </div>
            <Button icon="pi pi-print" label="Imprimir" class="p-button-secondary" @click="window.print()" />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    commentsWith: {
        type: String,
        default: 'w-2'
    }
});

</script>

<style scoped></style>
