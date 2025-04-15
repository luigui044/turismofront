<!-- components/FullscreenLoader.vue -->
<template>
    <div class="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
