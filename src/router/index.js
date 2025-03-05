import RecipeTop from '@/components/RecipeTop.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RecipeDetail from '../components/RecipeDetail.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: RecipeTop,
  },
  {
    path: '/:variable',
    name: 'RecipeDetail',
    component: RecipeDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
