import RecipeTop from '@/components/RecipeTop.vue';
import SavedRecipes from '@/components/SavedRecipes.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AboutUs from '../components/AboutUs.vue';
import AddRecipe from '../components/AddRecipe.vue';
import RecipeDetail from '../components/RecipeDetail.vue';
import SearchResults from '../components/SearchResults.vue';
import { supabase } from '../supabase';

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
    path: '/saved',
    name: 'SavedRecipes',
    component: SavedRecipes,
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

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (to.path === '/post' && !user) {
    next('/');
  } else {
    next();
  }
});

export default router;
