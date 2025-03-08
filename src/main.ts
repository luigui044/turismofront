import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import BadgeDirective from 'primevue/badgedirective';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Logo from './components/Logo.vue'
import Video from './components/VideoPortada.vue';
import Card from 'primevue/card';
import Galleria from 'primevue/galleria';
import { createPinia } from 'pinia';
import Button from 'primevue/button';
import Ripple from 'primevue/ripple';
import Vue3SocialSharingPlugin from "vue3-social-sharing";
import Textarea from 'primevue/textarea';
import FloatLabel from 'primevue/floatlabel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { createI18n } from 'vue-i18n';
import SectionLugares from '@/components/home/SectionLugares.vue';
import SectionOfertas from '@/components/home/SectionOfertas.vue';
import SectionEventos from '@/components/home/SectionEventos.vue';
import ShareSocialComponents from '@/components/ShareSocialComponents.vue';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';

const i18n = createI18n({
    legacy: false, // Desactiva la API Legacy
    locale: 'es', // Idioma por defecto
    messages: {
        en: { welcome: 'Welcome' },
        es: { welcome: 'Bienvenido' }
    }
})

const app = createApp(App)

app.use(PrimeVue);
app.use(router);
app.use(Vue3SocialSharingPlugin);
app.use(i18n);
app.use(ToastService);
app.component('SectionLugares', SectionLugares);
app.component('SectionOfertas', SectionOfertas);
app.component('SectionEventos', SectionEventos);
app.component('ShareSocialComponents', ShareSocialComponents);
app.component('Menubar', Menubar);
app.component('Galleria', Galleria);
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Dropdown', Dropdown);
app.component('ProgressBar', ProgressBar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Card', Card);
app.component('Logo', Logo);
app.component('Video', Video);
app.component('Button', Button);
app.component('Textarea', Textarea);
app.component('Dialog', Dialog);
app.directive('ripple', Ripple);
app.component('FloatLabel', FloatLabel);
app.component('Toast', Toast);
app.mount('#app');
