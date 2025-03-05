import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import RecipeDetail from '../components/RecipeDetail.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
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
