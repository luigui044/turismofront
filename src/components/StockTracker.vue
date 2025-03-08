<template>
    <div class="stock-tracker p-3 shadow-4">
        <div class="flex justify-content-between align-items-center mb-3">
            <h3 class="m-0">Índices Bursátiles</h3>
            <router-link to="/stocks" class="text-sm">
                <Button label="Ver más" icon="pi pi-external-link" link size="small" />
            </router-link>
        </div>
        <div class="stock-container">
            <div v-if="loading" class="flex justify-content-center">
                <ProgressSpinner style="width: 30px; height: 30px" />
            </div>
            <div v-else>
                <div v-for="(stock, index) in stocks" :key="index" class="stock-item mb-3 p-2"
                    :class="getChangeClass(stock.change)">
                    <div class="flex justify-content-between align-items-center">
                        <span class="font-bold">{{ stock.symbol }}</span>
                        <span class="text-sm">{{ stock.price }}</span>
                    </div>
                    <div class="flex justify-content-between align-items-center">
                        <span class="text-sm">{{ stock.name }}</span>
                        <span class="change-value">
                            <i :class="stock.change >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                            {{ Math.abs(stock.change).toFixed(2) }}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <a href="https://www.investing.com/" target="_blank" rel="noopener noreferrer"
                class="p-button p-button-link">
                <i class="pi pi-chart-line mr-2"></i>
                Ver más información bursátil
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const loading = ref(true);
const stocks = ref([
    { symbol: 'S&P 500', name: 'Standard & Poor\'s 500', price: '0.00', change: 0 },
    { symbol: 'DOW', name: 'Dow Jones Industrial', price: '0.00', change: 0 },
    { symbol: 'NASDAQ', name: 'NASDAQ Composite', price: '0.00', change: 0 }
]);

let intervalId;

const getChangeClass = (change) => {
    return {
        'stock-up': change > 0,
        'stock-down': change < 0,
        'stock-neutral': change === 0
    };
};

const fetchStockData = async () => {
    try {
        loading.value = true;
        // Simulación de datos en tiempo real
        stocks.value = stocks.value.map(stock => ({
            ...stock,
            price: (Math.random() * 1000 + 15000).toFixed(2),
            change: (Math.random() * 4 - 2).toFixed(2)
        }));
    } catch (error) {
        console.error('Error fetching stock data:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchStockData();
    intervalId = setInterval(fetchStockData, 5000);
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
:deep(.stock-tracker) {
    background-color: #f8f9fa;
    border-radius: 8px;
}

:deep(.stock-item) {
    border-radius: 6px;
    transition: all 0.3s ease;
}

:deep(.stock-up) {
    background-color: rgba(34, 197, 94, 0.1);
    border-left: 4px solid #22c55e;
}

:deep(.stock-down) {
    background-color: rgba(239, 68, 68, 0.1);
    border-left: 4px solid #ef4444;
}

:deep(.stock-neutral) {
    background-color: rgba(100, 116, 139, 0.1);
    border-left: 4px solid #64748b;
}

:deep(.change-value) {
    font-size: 0.9rem;
    font-weight: 500;
}

:deep(.stock-up .change-value) {
    color: #22c55e;
}

:deep(.stock-down .change-value) {
    color: #ef4444;
}

:deep(.p-button.p-button-link) {
    color: var(--primary-color);
    text-decoration: none;
}

:deep(.p-button.p-button-link:hover) {
    text-decoration: underline;
}
</style>