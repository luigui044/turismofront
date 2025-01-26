<template>
    <div class="card flex justify-content-center">
        <Dialog :visible="visible" @update:visible="updateVisible" modal :header="title" :style="{ width: '35vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

            <slot name="body">
                <span>Content</span>
            </slot>
            <template #footer>
                <slot name="footer">
                    <Button type="button" label="Cerrar" severity="danger" @click="updateVisible(false)"></Button>
                    <!-- <Button type="button" label="Save" @click="updateVisible(false)"></Button> -->
                </slot>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'titulo'
    },
    headerBg: {
        type: String,

    },
    headerColorText: String,

});

const emit = defineEmits(['update:visible']);
const updateVisible = (value) => {
    emit('update:visible', value);
};
document.documentElement.style.setProperty('--header-bg-color', props.headerBg || '#fff');
document.documentElement.style.setProperty('--header-text-color', props.headerColorText || '#fff');

</script>


<style scope>
.p-dialog-header {
    background-color: var(--header-bg-color, #fff);
    color: var(--header-text-color, #fff);
    text-align: right !important;
    text-transform: uppercase !important;
}

.p-dialog-header .p-icon.p-dialog-header-close-icon {
    color: var(--header-text-color, #fff);
}

.p-dialog-header .p-icon.p-dialog-header-close-icon:hover {
    color: var(--header-bg-color, #fff);
}
</style>