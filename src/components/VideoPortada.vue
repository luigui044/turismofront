<template>
    <div class="video-background">
        <video :src="props.videoUrl" id="videoPortada" autoplay muted loop></video>
        <div class="content">
            <!-- <h1>Texto sobre el video</h1> -->
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    videoUrl: String
});



</script>