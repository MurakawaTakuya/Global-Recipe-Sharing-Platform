import RecipeTop from '@/components/RecipeTop.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AddRecipe from '../components/AddRecipe.vue';
import RecipeDetail from '../components/RecipeDetail.vue';
import SearchResults from '../components/SearchResults.vue';
import AboutUs from '../components/AboutUs.vue';

const routes = [
  {
    path: '/',
    name: 'App',
    component: RecipeTop,
  },
  {
    path: '/recipe/:variable',
    name: 'RecipeDetail',
    component: RecipeDetail,
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/post',
    name: 'AddRecipe',
    component: AddRecipe,
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
