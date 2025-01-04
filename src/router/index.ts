import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import TemplateView from '../views/TemplateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      component: BlogView,
      props: (route) => ({ slug: route.params.slug }),
    }

  ]
})

export default router
