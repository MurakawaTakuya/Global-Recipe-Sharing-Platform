<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div class="search-result">
    <h1>Search Results for "{{ routeQuery }}"</h1>
  </div>
  <div class="search-list">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';
import RecipeCard from './RecipeCard.vue';

export default {
  name: 'SearchResults',
  components: {
    RecipeCard,
  },
  setup() {
    const route = useRoute();
    const routeQuery = ref(route.params.query);
    const recipes = ref([]);

    // Supabase から検索結果を取得する関数
    const fetchRecipes = async () => {
      if (!routeQuery.value) {
        recipes.value = [];
        return;
      }

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .ilike('name', `%${routeQuery.value}%`);

      if (error) {
        console.error('Error fetching recipes:', error);
        return;
      }

      recipes.value = data;
    };

    // クエリが変わるたびに検索を実行
    watch(
      () => route.params.query,
      (newQuery) => {
        routeQuery.value = newQuery;
        fetchRecipes();
      },
    );

    // 初回読み込み時に検索を実行
    onMounted(fetchRecipes);

    return {
      routeQuery,
      recipes,
    };
  },
};
</script>

<style scoped>
.search-result {
  text-align: center;
}
.search-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
