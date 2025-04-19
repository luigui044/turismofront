<template>
    <div class="grid-nogutter ">
        <div class="lg:col-12 bg-custom-primary">
            <Menubar :model="menu">
                <template #start>
                    <Logo />
                </template>
                <template #item="{ item, props, hasSubmenu, root }">

                    <router-link :to="item.to" v-ripple class="flex align-items-center flex-grow-1"
                        v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <i v-if="hasSubmenu"
                            :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                    </router-link>

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
import { ref, onMounted, watch } from "vue";
import Logo from "./Logo.vue";
import AnuncioBanner from "./AnuncioBanner.vue";
import { menuService } from "../services/api/menuServices";

interface MenuItem {

    to: string;
    icon: string;
    label: string;
    badge?: string;
    orden?: number;
    item_padre?: boolean;
    items?: MenuItem[];
}

const menu = ref<MenuItem[]>([]);

const props = defineProps({
    internacional: {
        type: Number,
        default: 1
    }
});

onMounted(() => {
    obtenerMenu();
});

watch(() => props.internacional, () => {
    menu.value = []; // limpiar el menú actual si cambia la prop
    obtenerMenu();
});


const obtenerMenu = async () => {

    const menuId = props.internacional;

    const response = await menuService.getMenu(menuId);
    // console.log(response.data);

    for (const item of response.data) {
        menu.value.push({
            to: item.attributes.to,
            icon: item.attributes.icon,
            label: item.attributes.label,
            badge: item.attributes.badge,
            orden: item.attributes.orden,
            item_padre: item.attributes.item_padre,
            items: item?.attributes?.t_menu_subitems?.data?.length ? item.attributes.t_menu_subitems.data.map((subitem: any) => ({
                to: subitem.attributes.to,
                icon: subitem.attributes.icon,
                label: subitem.attributes.label,
                badge: subitem.attributes.badge,
                orden: subitem.attributes.orden,
            })) : undefined
        });

    }

    // console.log(menu.value);
};




// const items = ref([
//     {
//         label: 'Inicio',
//         icon: 'pi pi-home',
//         to: '/'

//     },
//     {
//         label: 'Noticias',
//         icon: 'pi pi-comments',
//         to: '/noticias'
//     },
//     {
//         label: 'El Salvador',
//         icon: 'pi pi-map-marker',
//         to: '/el-salvador',
//         items: [
//             {
//                 label: 'Información',
//                 icon: 'pi pi-bolt',
//                 to: '/el-salvador/informacion',
//             },
//             {
//                 label: 'Ingresar al país',
//                 icon: 'pi pi-server',
//                 to: '/',
//             },
//             {
//                 label: 'Bio Seguridad',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Recomendaciones',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Embajadas',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Tel Emergencias',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Oficinas de turismo',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },

//         ]
//     },
//     {
//         label: 'Turismo',
//         icon: 'pi pi-map',
//         to: '/',
//         items: [
//             {
//                 label: 'Registro Empresa',
//                 icon: 'pi pi-bolt',
//                 to: '/',
//             },
//             {
//                 label: 'Ingreso Usuario',
//                 icon: 'pi pi-server',
//                 to: '/',
//             },
//             {
//                 label: 'Modificar Registro',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Soporte',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Como Registrarme',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },
//             {
//                 label: 'Ventajas',
//                 icon: 'pi pi-pencil',
//                 to: '/',
//             },

//         ]
//     }, {
//         label: 'Contáctenos',
//         icon: 'pi pi-phone',
//         to: '/',
//         items: [
//             {
//                 label: 'Quienes Somos',
//                 icon: 'pi pi-bolt',
//                 to: '/',

//             },
//             {
//                 label: 'Publicidad',
//                 icon: 'pi pi-server',
//                 to: '/',
//             }


//         ]
//     }
// ]);
</script>

<style scoped>
:deep(.p-menuitem-link) {
    color: white;
}

:deep(.p-focus:hover),
:deep(.p-focus),
:deep(.p-menuitem:hover),
:deep(.p-menuitem-content),
:deep(.p-menuitem-link:hover) {
    background: none !important;
}

/* El problema era que la clase router-link-active estaba anidada incorrectamente */
:deep(.p-menuitem-link:hover)

/* :deep(.router-link-active.p-menuitem-link) */
    {
    background: white !important;
    color: #084C61 !important;
    border-radius: 5px !important;
}

:deep(.p-submenu-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link) {

    color: #084C61 !important;

}

:deep(.p-submenu-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link:hover) {
    background: #084C61 !important;
    color: white !important;

}
</style>
