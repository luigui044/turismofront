<template>

    <div>
        <img :src="bannerExample1" :width="width" :height="height">
    </div>
</template>

<script setup>
import bannerExample1 from "../assets/adsdefault/banner1.png";

const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    }
});
</script>