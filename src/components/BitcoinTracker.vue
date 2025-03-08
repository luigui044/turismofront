<template>
    <div class="bitcoin-tracker p-3 shadow-4">
        <div class="flex justify-content-between align-items-center mb-3">
            <h3 class="m-0">Bitcoin Price</h3>
            <router-link to="/crypto" class="text-sm">
                <Button label="Ver más" icon="pi pi-external-link" link size="small" />
            </router-link>
        </div>
        <div class="price-container text-center">
            <div v-if="loading" class="flex justify-content-center">
                <ProgressSpinner style="width: 30px; height: 30px" />
            </div>
            <div v-else>
                <div class="price-large mb-2" :class="{
                    'price-update': priceChanged,
                    'bg-success': priceIncreased,
                    'bg-danger': priceDecreased
                }">
                    ${{ price.toLocaleString() }} USD
                </div>
                <div class="change-24h" :class="{
                    'text-success': priceChange >= 0,
                    'text-danger': priceChange < 0,
                    'value-update': percentChanged
                }">
                    <i :class="priceChange >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                    {{ Math.abs(priceChange).toFixed(2) }}%
                </div>
                <div class="text-sm text-500">
                    Actualizado: {{ lastUpdate }}
                </div>
            </div>
        </div>
        <!-- Enlaces a sitios de criptomonedas -->
        <div class="flex justify-content-center gap-2 mt-3">
            <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" class="p-button p-button-link">
                <i class="pi pi-money-bill mr-2"></i>
                Binance
            </a>
            <a href="https://coinmarketcap.com" target="_blank" rel="noopener noreferrer"
                class="p-button p-button-link">
                <i class="pi pi-chart-line mr-2"></i>
                CoinMarketCap
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const price = ref(0);
const priceChange = ref(0);
const loading = ref(true);
const lastUpdate = ref('');
const priceChanged = ref(false);
const percentChanged = ref(false);
const priceIncreased = ref(false);
const priceDecreased = ref(false);
let intervalId;
let lastPrice = 0;

const animateChange = (newPrice) => {
    priceChanged.value = true;
    percentChanged.value = true;

    // Determinar si el precio subió o bajó
    if (lastPrice > 0) {
        priceIncreased.value = newPrice > lastPrice;
        priceDecreased.value = newPrice < lastPrice;
    }

    setTimeout(() => {
        priceChanged.value = false;
        percentChanged.value = false;
        priceIncreased.value = false;
        priceDecreased.value = false;
    }, 600);

    lastPrice = newPrice;
};

const fetchBitcoinPrice = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();

        const newPrice = data.bitcoin.usd;
        price.value = newPrice;
        priceChange.value = data.bitcoin.usd_24h_change;
        lastUpdate.value = new Date().toLocaleTimeString();
        animateChange(newPrice);
        loading.value = false;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
};

onMounted(() => {
    fetchBitcoinPrice();
    intervalId = setInterval(fetchBitcoinPrice, 5000);
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
:deep(.bitcoin-tracker) {
    background-color: #f8f9fa;
    border-radius: 8px;
}

:deep(.price-large) {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

:deep(.price-animate) {
    animation: scaleUp 1s ease;
}

:deep(.price-up) {
    background-color: rgba(34, 197, 94, 0.2);
    color: #22c55e;
}

:deep(.price-down) {
    background-color: rgba(239, 68, 68, 0.2);
    color: #ef4444;
}

@keyframes scaleUp {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

:deep(.text-success) {
    color: #22c55e;
}

:deep(.text-danger) {
    color: #ef4444;
}

.change-24h {
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.text-sm {
    font-size: 0.875rem;
    color: #6b7280;
}

.text-500 {
    font-size: 0.875rem;
    font-weight: 500;
}

@keyframes highlight {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.1);
        opacity: 0.9;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.price-update {
    animation: highlight 0.6s ease;
}

.value-update {
    animation: highlight 0.6s ease;
}

:deep(.p-button.p-button-link) {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.875rem;
}

:deep(.p-button.p-button-link:hover) {
    text-decoration: underline;
}

:deep(.gap-2) {
    gap: 0.5rem;
}
</style>