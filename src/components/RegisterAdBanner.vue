<template>
    <div class="register-ad p-3 shadow-4">
        <div class="flex flex-column align-items-center text-center">
            <img src="@/assets/logo.png" alt="TurismoMas" class="mb-3" style="width: 150px;" />

            <h3 class="mb-3">¿Tienes una empresa de turismo?</h3>

            <p class="mb-3">¡Regístrala GRATIS y forma parte de nuestra red!</p>

            <a href="https://tm.probalosv.com/" target="_blank" rel="noopener noreferrer"
                style="text-decoration: none;">
                <Button class="p-button-primary" style="background-color: #56A3A6;">
                    <i class="pi pi-building mr-2"></i>
                    Registrar mi empresa
                </Button>
            </a>
        </div>
    </div>
</template>

<style scoped>
:deep(.register-ad) {
    background-color: #f8f9fa;
    border-radius: 8px;
}

:deep(.p-button) {
    font-weight: 600;
}

:deep(.p-button:hover) {
    background-color: #4a8d90 !important;
}

:deep(.register-ad:hover) {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
}
</style>