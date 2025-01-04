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


const i18n = createI18n({
    locale: 'es', // Idioma por defecto
    fallbackLocale: 'en', // Idioma de respaldo
    messages: {
        en: {
            hello: 'Hello World',
        },
        es: {
            hello: 'Hola Mundo',
        },
    },
});
const app = createApp(App)

app.use(PrimeVue);
app.use(router);
app.use(Vue3SocialSharingPlugin);
app.use(i18n);
app.component('SectionLugares', SectionLugares);
app.component('SectionOfertas', SectionOfertas);
app.component('SectionEventos', SectionEventos);
app.component('Menubar', Menubar);
app.component('Galleria', Galleria);
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Logo', Logo);
app.component('Video', Video);
app.component('Button', Button);
app.component('Textarea', Textarea);
app.directive('ripple', Ripple);
app.component('FloatLabel', FloatLabel);
app.mount('#app');
