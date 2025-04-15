import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import CountryView from '../views/CountryView.vue'
import TemplateView from '../views/TemplateView.vue'
import InConstructionView from '../views/InConstructionView.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const countriesInConstruction = [
  'belice',
  'guatemala',
  'honduras',
  'nicaragua',
  'panama',
  'costa-rica',
  'rep-dominicana'
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/international',
    name: 'international',
    component: HomeView,
    props: { country: 1 }
  },
  {
    path: '/el-salvador',
    children: [
      {
        path: '',
        name: 'el-salvador',
        component: CountryView,
        props: { country: 2 }
      },
      {
        path: 'informacion',
        name: 'informacion',
        component: CountryView
      }
    ]
  },
  ...countriesInConstruction.map(country => ({
    path: `/${country}`,
    name: country,
    component: InConstructionView
  })),
  {
    path: '/noticias',
    name: 'news',
    component: NewsView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/ofertas',
    name: 'ofertas',
    component: TemplateView
  },
  {
    path: '/eventos',
    name: 'eventos',
    component: TemplateView
  },
  {
    path: '/blog/:slug',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    props: true,
    meta: {
      params: {
        slug: {
          type: String,
          required: true
        }
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Configurar el loader
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
