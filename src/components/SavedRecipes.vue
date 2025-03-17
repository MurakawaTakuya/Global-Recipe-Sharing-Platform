<template>
  <div>
    <h1 class="saved-title">Saved Recipes</h1>
    <div class="recipe-list">
      <template v-if="savedRecipes.length > 0">
        <RecipeCard v-for="recipe in savedRecipes" :key="recipe" :recipeId="recipe" />
      </template>
      <p v-else>No saved recipes</p>
    </div>
  </div>
</template>

<script>
import { getSavedRecipes } from '../utils/saveRecipe.js';
import RecipeCard from './RecipeCard.vue';

export default {
  name: 'savedRecipes',
  components: { RecipeCard },
  data() {
    return {
      savedRecipes: [],
    };
  },
  created() {
    this.loadRecipes();
  },
  methods: {
    loadRecipes() {
      this.savedRecipes = getSavedRecipes();
    },
  },
};
</script>

<style scoped>
.saved-title {
  text-align: center;
  margin-bottom: 10px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
