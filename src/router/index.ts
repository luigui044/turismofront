import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import CountryView from '../views/CountryView.vue'
import BlogView from '../views/BlogView.vue'
import TemplateView from '../views/TemplateView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/el-salvador',
    name: 'el-salvador',
    component: CountryView
  },
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

export default router
