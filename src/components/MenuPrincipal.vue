<template>
    <div class="grid-nogutter">
        <div class="lg:col-12 bg-custom-primary">
            <Menubar :model="items">
                <template #start>
                    <Logo />
                </template>
                <template #item="{ item, props, hasSubmenu, root }">
                    <router-link :to="item.to" v-ripple class="flex align-items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                        <span v-if="item.shortcut"
                            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
                                item.shortcut
                            }}</span>
                        <i v-if="hasSubmenu"
                            :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                    </router-link>
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
        <div class="lg:col-12">
            <Video :videoUrl="'/videos/videobannerSV.mp4'" />


        </div>
    </div>


</template>

<script setup>
import { ref } from "vue";
import Logo from "./Logo.vue";

const items = ref([
    {
        label: 'Inicio',
        icon: 'pi pi-home',
        to: '/'

    },
    // {
    //     label: 'Noticias',
    //     icon: 'pi pi-comments'
    // },
    // {
    //     label: 'El Salvador',
    //     icon: 'pi pi-map-marker',
    //     items: [
    //         {
    //             label: 'Información',
    //             icon: 'pi pi-bolt',

    //         },
    //         {
    //             label: 'Ingresar al país',
    //             icon: 'pi pi-server',

    //         },
    //         {
    //             label: 'Bio Seguridad',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Recomendaciones',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Embajadas',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Tel Emergencias',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Oficinas de turismo',
    //             icon: 'pi pi-pencil',

    //         },

    //     ]
    // },
    // {
    //     label: 'Turismo',
    //     icon: 'pi pi-map',
    //     items: [
    //         {
    //             label: 'Registro Empresa',
    //             icon: 'pi pi-bolt',

    //         },
    //         {
    //             label: 'Ingreso Usuario',
    //             icon: 'pi pi-server',

    //         },
    //         {
    //             label: 'Modificar Registro',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Soporte',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Como Registrarme',
    //             icon: 'pi pi-pencil',

    //         },
    //         {
    //             label: 'Ventajas',
    //             icon: 'pi pi-pencil',

    //         }

    //     ]
    // }, {
    //     label: 'Contáctenos',
    //     icon: 'pi pi-phone',
    //     items: [
    //         {
    //             label: 'Quienes Somos',
    //             icon: 'pi pi-bolt',

    //         },
    //         {
    //             label: 'Publicidad',
    //             icon: 'pi pi-server',

    //         }


    //     ]
    // }
]);
</script>
