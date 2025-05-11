<script setup lang="ts">
import LayoutMaster from '@/views/layouts/LayoutMaster.vue';
import { ref } from 'vue';
import companyServices from '@/services/api/companyServices';

import { useToast } from 'primevue/usetoast';
import { v4 as uuidv4 } from 'uuid'
const toast = useToast();

const empresa = ref({
    id: 0,
    uid_empresa: '',
    nombre_comercial: '',
    nombre_legal: '',
    slogan: '',
    direccion: '',
    direccion_maps: '',
    direccion_waze: '',
    email: '',
    telefono: '',
    nit: '',
    ncr: '',
    tipos_servicios: '',
    servicios_extras: '',
    historia: '',
    como_llegar: '',
});

const mostrarFormulario = ref(false);
const nombre = ref('');
const slogan = ref('');
const direccion = ref('');
const telefono = ref('');
const email = ref('');
const ubicacionGoogle = ref('');
const ubicacionWaze = ref('');
const nit = ref('');
const ncr = ref('');
const servicios = ref('');
const serviciosExtras = ref('');
const historia = ref('');
const comoLlegar = ref('');
const comentarios = ref('');
const mostrarConfirmacion = ref(false);
const loading = ref(false);

const validarFormulario = () => {
    if (!nombre.value || !email.value || !telefono.value || !direccion.value || !servicios.value) {
        console.log('error');
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor complete todos los campos obligatorios',
            life: 3000
        });
        return false;
    }
    return true;
};

const mostrarModalConfirmacion = () => {
    console.log('modal');
    if (validarFormulario()) {
        mostrarConfirmacion.value = true;
    }
};

const confirmarRegistro = async () => {
    try {
        loading.value = true;
        const uidEmpresa = uuidv4();
        const datosEmpresa = {
            data: {
                uid_empresa: uidEmpresa,
                nombre_comercial: nombre.value,
                nombre_legal: nombre.value,
                slogan: slogan.value,
                direccion: direccion.value,
                direccion_maps: ubicacionGoogle.value,
                direccion_waze: ubicacionWaze.value,
                email: email.value,
                telefono: telefono.value,
                nit: nit.value,
                ncr: ncr.value,
                tipos_servicios: servicios.value,
                servicios_extras: serviciosExtras.value,
                historia: historia.value,
                como_llegar: comoLlegar.value
            }
        };

        const response = await companyServices.createCompany(datosEmpresa);

        if (response.status === 200) {
            toast.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Su registro se ha realizado correctamente, se le enviará un correo electrónico para que pueda confirmar su registro.',
                life: 3000
            });
            mostrarConfirmacion.value = false;
            mostrarFormulario.value = false;
            resetearFormulario();
        } else {
            throw new Error(response.data.message || 'Error al registrar la empresa');
        }
    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Error al registrar la empresa',
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};

const resetearFormulario = () => {
    nombre.value = '';
    slogan.value = '';
    direccion.value = '';
    telefono.value = '';
    email.value = '';
    ubicacionGoogle.value = '';
    ubicacionWaze.value = '';
    nit.value = '';
    ncr.value = '';
    servicios.value = '';
    serviciosExtras.value = '';
    historia.value = '';
    comoLlegar.value = '';
    comentarios.value = '';
};

const mostrarFormularioRegistro = () => {
    mostrarFormulario.value = true;
};
</script>

<template>
    <LayoutMaster :internacional="1">
        <template #content>
            <div class="grid-nogutter flex align-items-center justify-content-center lg:mt-4">
                <div class="col-12 lg:col-8 text-center">
                    <div class="grid">
                        <!-- Primera Card - Información de Registro -->
                        <div v-if="!mostrarFormulario" class="col-12 mb-4">
                            <Card class="shadow-8">
                                <template #title>
                                    <h2 class="text-2xl font-bold text-custom-primary">Bienvenido al registro de
                                        empresas</h2>
                                </template>
                                <template #content>
                                    <div class="text-left">
                                        <ul class="list-none p-0 m-0">
                                            <li class="mb-2">
                                                <i class="pi pi-check-circle text-custom-primary mr-2"></i>
                                                Antes de iniciar, asegúrate de que tu empresa esté dedicada al turismo y
                                                actividades afines.
                                            </li>
                                            <li class="mb-2">
                                                <i class="pi pi-check-circle text-custom-primary mr-2"></i>
                                                Llena todos los campos obligatorios en el formulario.
                                            </li>
                                            <li class="mb-2">
                                                <i class="pi pi-check-circle text-custom-primary mr-2"></i>
                                                Puedes modificar tu información tantas veces como desees.
                                            </li>
                                            <li class="mb-2">
                                                <i class="pi pi-check-circle text-custom-primary mr-2"></i>
                                                Solo se permite inscribir una vez la empresa, a menos que se haya
                                                eliminado el registro.
                                            </li>
                                            <li class="mb-2">
                                                <i class="pi pi-check-circle text-custom-primary mr-2"></i>
                                                Para cualquier duda, contacta al equipo de Marketing.
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="flex justify-content-center mt-4">
                                        <Button label="Comenzar" class="p-button-primary"
                                            @click="mostrarFormularioRegistro" />
                                    </div>
                                </template>
                            </Card>
                        </div>

                        <!-- Segunda Card - Formulario de Registro -->
                        <div v-if="mostrarFormulario" class="col-12">
                            <Card class="shadow-8">
                                <template #title>
                                    <h2 class="text-2xl font-bold text-custom-primary">Registro de empresa</h2>
                                </template>
                                <template #content>
                                    <div class="grid">
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="nombre" v-model="nombre" class="w-full"
                                                    :class="{ 'p-invalid': !nombre && mostrarConfirmacion }" />
                                                <label for="nombre">Nombre de la empresa *</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="slogan" v-model="slogan" class="w-full" />
                                                <label for="slogan">Slogan</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="email" v-model="email" class="w-full"
                                                    :class="{ 'p-invalid': !email && mostrarConfirmacion }" />
                                                <label for="email">Correo electrónico *</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="telefono" v-model="telefono" class="w-full"
                                                    :class="{ 'p-invalid': !telefono && mostrarConfirmacion }" />
                                                <label for="telefono">Teléfono *</label>
                                            </span>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="direccion" v-model="direccion" class="w-full"
                                                    :class="{ 'p-invalid': !direccion && mostrarConfirmacion }" />
                                                <label for="direccion">Dirección *</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="ubicacionGoogle" v-model="ubicacionGoogle"
                                                    class="w-full" />
                                                <label for="ubicacionGoogle">Ubicación (Google Maps)</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="ubicacionWaze" v-model="ubicacionWaze" class="w-full" />
                                                <label for="ubicacionWaze">Ubicación (Waze)</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="nit" v-model="nit" class="w-full" />
                                                <label for="nit">NIT (opcional)</label>
                                            </span>
                                        </div>
                                        <div class="col-12 md:col-6 mb-3">
                                            <span class="p-float-label">
                                                <InputText id="ncr" v-model="ncr" class="w-full" />
                                                <label for="ncr">NCR (opcional)</label>
                                            </span>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <span class="p-float-label">
                                                <Textarea id="servicios" v-model="servicios" rows="3" class="w-full" />
                                                <label for="servicios">Servicios ofrecidos</label>
                                            </span>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <span class="p-float-label">
                                                <Textarea id="serviciosExtras" v-model="serviciosExtras" rows="3"
                                                    class="w-full" />
                                                <label for="serviciosExtras">Servicios extras</label>
                                            </span>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <span class="p-float-label">
                                                <Textarea id="historia" v-model="historia" rows="3" class="w-full" />
                                                <label for="historia">Historia</label>
                                            </span>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <span class="p-float-label">
                                                <Textarea id="comoLlegar" v-model="comoLlegar" rows="3"
                                                    class="w-full" />
                                                <label for="comoLlegar">Cómo llegar</label>
                                            </span>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <span class="p-float-label">
                                                <Textarea id="comentarios" v-model="comentarios" rows="3"
                                                    class="w-full" />
                                                <label for="comentarios">Dudas o comentarios</label>
                                            </span>
                                        </div>
                                        <div class="flex justify-content-center mt-4">
                                            <Button label="Registrar empresa" class="p-button-primary mr-2"
                                                @click="mostrarModalConfirmacion" />
                                            <Button label="Cancelar" class="p-button-secondary"
                                                @click="mostrarFormulario = false" />
                                        </div>
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </template>

    </LayoutMaster>

    <Dialog v-model:visible="mostrarConfirmacion" modal header="Confirmar registro" :style="{ width: '450px' }"
        :closable="false">
        <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>¿Está seguro que desea registrar los datos de la empresa?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="mostrarConfirmacion = false" />
            <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="confirmarRegistro" />
        </template>
    </Dialog>
</template>