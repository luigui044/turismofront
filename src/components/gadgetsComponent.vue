<template>
    <div class="grid-nogutter px-6 mt-4">
        <div class="col-3 px-2">
            <CurrencyConverter class="gadget-item" />
        </div>
        <div class="col-3 px-2">
            <BitcoinTracker class="gadget-item" />
        </div>
        <div class="col-3 px-2">
            <StockTracker class="gadget-item" />
        </div>
        <div class="col-3 px-2">
            <RegisterAdBanner class="gadget-item" />
        </div>
    </div>
</template>

<script setup>
import CurrencyConverter from './CurrencyConverter.vue';
import BitcoinTracker from './BitcoinTracker.vue';
import StockTracker from './StockTracker.vue';
import RegisterAdBanner from './RegisterAdBanner.vue';
</script>

<style scoped>
:deep(.gadget-item) {
    height: 300px;
    display: flex;
    flex-direction: column;
}

:deep(.currency-converter),
:deep(.bitcoin-tracker),
:deep(.stock-tracker),
:deep(.register-ad) {
    height: 100%;
}
</style>
