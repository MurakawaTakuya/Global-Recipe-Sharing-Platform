<template>
  <div class="search-criteria">
    <template v-if="routeName">
      <h2>Name: {{ routeName }}</h2>
    </template>
    <template v-if="routeCategory">
      <h2>
        Category:
        {{ Array.isArray(routeCategory) ? routeCategory.join(', ') : routeCategory }}
      </h2>
    </template>
    <template v-if="routeCountry">
      <h2>
        Country:
        {{ routeCountry === '0' ? 'Japan' : routeCountry === '1' ? 'France' : routeCountry }}
      </h2>
    </template>
  </div>
  <div class="search-list">
    <template v-if="loading">
      <p>Loading...</p>
    </template>
    <template v-else>
      <template v-if="recipes.length > 0">
        <RecipeCard v-for="item in recipes" :key="item.id" :recipeId="item.id" />
      </template>
      <h1 v-else>No recipes found</h1>
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
    const routeName = ref(route.query.name || '');
    const routeCategory = ref(route.query.category || '');
    const routeCountry = ref(route.query.country || '');
    const recipes = ref([]);
    const loading = ref(false);

    const fetchRecipes = async () => {
      loading.value = true;
      if (!routeName.value && !routeCategory.value && !routeCountry.value) {
        recipes.value = [];
        loading.value = false;
        return;
      }

      let query = supabase.from('recipes').select('id');

      if (routeName.value) {
        query = query.ilike('name', `%${routeName.value}%`);
      }

      if (routeCategory.value) {
        query = query.contains('category', [routeCategory.value]);
      }

      if (routeCountry.value) {
        query = query.eq('country', routeCountry.value);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching recipes:', error);
        loading.value = false;
        return;
      }

      recipes.value = data;
      loading.value = false;
    };

    watch(
      () => [route.query.name, route.query.category, route.query.country],
      ([newName, newCategory, newCountry]) => {
        routeName.value = newName || '';
        routeCategory.value = newCategory || '';
        routeCountry.value = newCountry || '';
        fetchRecipes();
      },
    );

    onMounted(fetchRecipes);

    return {
      routeName,
      routeCategory,
      routeCountry,
      recipes,
      loading,
    };
  },
};
</script>

<style scoped>
.search-criteria {
  display: flex;
  justify-content: center;
  gap: 0 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
