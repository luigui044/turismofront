<template>
    <div class="grid-nogutter ">
        <div class="lg:col-12 bg-custom-primary">
            <Menubar :model="items">
                <template #start>
                    <Logo />
                </template>
                <template #item="{ item, props, hasSubmenu, root }">
                    <div class="flex align-items-center w-full custom-class">
                        <router-link :to="item.to" v-ripple class="flex align-items-center flex-grow-1"
                            v-bind="props.action">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                            <span v-if="item.shortcut"
                                class="ml-1 border-1 surface-border border-round surface-100 text-xs p-1">
                                {{ item.shortcut }}
                            </span>
                        </router-link>

                        <i v-if="hasSubmenu"
                            :class="['pi pi-angle-down cursor-pointer text-white', { 'pi-angle-down ': root, 'pi-angle-right': !root }]"
                            v-bind="props.action">
                        </i>
                    </div>
                </template>
                <template #end>
                    <div class="flex align-items-center gap-2">
                        <!-- TODO agregar foto de perfil -->
                        <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                            shape="circle" /> -->
                    </div>
                </template>
            </Menubar>

        </div>
        <div class="lg:col-12 px-4 py-3">
            <AnuncioBanner />

        </div>

        <div class="lg:col-12">

            <Video :videoUrl="'/videos/videobannerSV.mp4'" />


        </div>
    </div>


</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Logo from "./Logo.vue";
import AnuncioBanner from "./AnuncioBanner.vue";
import { menuService } from "../services/api/menuServices";

const menus = ref([]);

onMounted(async () => {

    
    const response = await menuService.getMenu();
    menus.value = response;

});

const items = ref([
    {
        label: 'Inicio',
        icon: 'pi pi-home',
        to: '/'

    },
    {
        label: 'Noticias',
        icon: 'pi pi-comments',
        to: '/noticias'
    },
    {
        label: 'El Salvador',
        icon: 'pi pi-map-marker',
        to: '/el-salvador',
        items: [
            {
                label: 'Información',
                icon: 'pi pi-bolt',
                to: '/el-salvador/informacion',
            },
            {
                label: 'Ingresar al país',
                icon: 'pi pi-server',
                to: '/',
            },
            {
                label: 'Bio Seguridad',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Recomendaciones',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Embajadas',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Tel Emergencias',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Oficinas de turismo',
                icon: 'pi pi-pencil',
                to: '/',
            },

        ]
    },
    {
        label: 'Turismo',
        icon: 'pi pi-map',
        to: '/',
        items: [
            {
                label: 'Registro Empresa',
                icon: 'pi pi-bolt',
                to: '/',
            },
            {
                label: 'Ingreso Usuario',
                icon: 'pi pi-server',
                to: '/',
            },
            {
                label: 'Modificar Registro',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Soporte',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Como Registrarme',
                icon: 'pi pi-pencil',
                to: '/',
            },
            {
                label: 'Ventajas',
                icon: 'pi pi-pencil',
                to: '/',
            },

        ]
    }, {
        label: 'Contáctenos',
        icon: 'pi pi-phone',
        to: '/',
        items: [
            {
                label: 'Quienes Somos',
                icon: 'pi pi-bolt',
                to: '/',

            },
            {
                label: 'Publicidad',
                icon: 'pi pi-server',
                to: '/',
            }


        ]
    }
]);
</script>

<style scoped>
.custom-class {
    color: white;
}

:deep(.custom-class:hover),
:deep(.pi:hover) {
    color: #084C61 !important;
}
</style>
