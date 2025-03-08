<template>
    <div class="currency-converter p-3 shadow-4">
        <h3 class="mb-3">Convertidor de Moneda</h3>
        <div class="grid">
            <div class="col-12 mb-2">
                <InputNumber v-model="amount" placeholder="Cantidad" :minFractionDigits="2" :maxFractionDigits="2"
                    class="w-full" />
            </div>
            <div class="col-12 mb-2">
                <Dropdown v-model="fromCurrency" :options="currencies" optionLabel="name" optionValue="code"
                    placeholder="De" class="w-full" @change="convertCurrency" />
            </div>
            <div class="col-12 mb-2">
                <Dropdown v-model="toCurrency" :options="currencies" optionLabel="name" optionValue="code"
                    placeholder="A" class="w-full" @change="convertCurrency" />
            </div>
            <div class="col-12 text-center">
                <h4 v-if="!loading">{{ result }}</h4>
                <ProgressSpinner v-else style="width: 30px; height: 30px" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY; // Reemplaza con tu API key
const amount = ref(1);
const fromCurrency = ref('USD');
const toCurrency = ref('EUR');
const result = ref('');
const loading = ref(false);

const currencies = [
    { name: 'USD - Dólar estadounidense', code: 'USD' },
    { name: 'EUR - Euro', code: 'EUR' },
    { name: 'GBP - Libra esterlina', code: 'GBP' },
    { name: 'SVC - Colón salvadoreño', code: 'SVC' },
    { name: 'MXN - Peso mexicano', code: 'MXN' },
    { name: 'JPY - Yen japonés', code: 'JPY' },
    { name: 'CAD - Dólar canadiense', code: 'CAD' },
];

const convertCurrency = async () => {
    if (!amount.value || !fromCurrency.value || !toCurrency.value) {
        result.value = '0.00';
        return;
    }

    try {
        loading.value = true;
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency.value}/${toCurrency.value}/${amount.value}`);
        const data = await response.json();

        if (data.result === 'success') {
            result.value = `${data.conversion_result.toFixed(2)} ${toCurrency.value}`;
        } else {
            throw new Error(data.error - type || 'Error en la conversión');
        }
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al convertir la moneda',
            life: 3000
        });
        result.value = 'Error en la conversión';
    } finally {
        loading.value = false;
    }
};

// Realizar una conversión inicial al montar el componente
onMounted(() => {
    convertCurrency();
});

// Observar cambios en el monto para actualizar la conversión
watch(amount, () => {
    convertCurrency();
});
</script>

<style scoped>
:deep(.currency-converter) {
    background-color: #f8f9fa;
    border-radius: 8px;
}

:deep(.p-inputnumber-input) {
    width: 100%;
}

:deep(.p-dropdown) {
    width: 100%;
}

:deep(.p-dropdown-label) {
    text-overflow: ellipsis;
}

:deep(.result-text) {
    font-size: 1.2rem;
    font-weight: bold;
}
</style>
