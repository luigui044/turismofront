<template>
    <div class="social-component p-3 mt-3">
        <h3 class="social-title mb-3">Síguenos en:</h3>
        <div class="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link mb-2">
                <i class="pi pi-facebook"></i>
                <span>Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link mb-2">
                <i class="pi pi-twitter"></i>
                <span>Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link mb-2">
                <i class="pi pi-instagram"></i>
                <span>Instagram</span>
            </a>
            <!-- otros enlaces sociales -->
        </div>
    </div>
</template>



<style scoped>
.social-component {
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: auto;
    min-height: 200px;
}

.social-title {
    color: #495057;
    font-size: 1.2rem;
    font-weight: 600;
}

.social-links {
    display: flex;
    flex-direction: column;
}

.social-link {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    color: #56A3A6 !important;
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 4px;
}

.social-link:hover {
    background-color: rgba(86, 163, 166, 0.1);
    transform: translateX(5px);
}

.social-link i {
    font-size: 1.2rem;
    margin-right: 0.5rem;
}

.social-link span {
    font-size: 1rem;
}

/* Asegurar que estos estilos no afecten a otros componentes */
:deep(.p-card),
:deep(.p-card-body),
:deep(.p-card-content) {
    height: auto !important;
}
</style>