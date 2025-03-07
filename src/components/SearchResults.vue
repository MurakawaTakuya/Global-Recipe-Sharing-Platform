<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div class="search-result">
    <h1>Search Results for "{{ routeQuery }}"</h1>
  </div>
  <div class="search-list">
    <template v-if="loading">
      <p>Loading...</p>
    </template>
    <template v-else>
      <template v-if="recipes.length > 0">
        <RecipeCard v-for="item in recipes" :key="item.id" :recipeId="item.id" />
      </template>
      <p v-else>No recipes found</p>
    </template>
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
    const loading = ref(false);

    const fetchRecipes = async () => {
      loading.value = true;
      if (!routeQuery.value) {
        recipes.value = [];
        loading.value = false;
        return;
      }

      const { data, error } = await supabase
        .from('recipes')
        .select('id')
        .ilike('name', `%${routeQuery.value}%`);

      if (error) {
        console.error('Error fetching recipes:', error);
        loading.value = false;
        return;
      }

      recipes.value = data;
      loading.value = false;
    };

    watch(
      () => route.params.query,
      (newQuery) => {
        routeQuery.value = newQuery;
        fetchRecipes();
      },
    );

    onMounted(fetchRecipes);

    return {
      routeQuery,
      recipes,
      loading,
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
  gap: 10px;
  margin: 0 30px;
}
</style>
