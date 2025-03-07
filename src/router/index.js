import RecipeTop from '@/components/RecipeTop.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PostRecipe from '../components/PostRecipe.vue';
import RecipeDetail from '../components/RecipeDetail.vue';
import SearchResults from '../components/SearchResults.vue';

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
    path: '/search/:query',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/post',
    name: 'PostRecipe',
    component: PostRecipe,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
