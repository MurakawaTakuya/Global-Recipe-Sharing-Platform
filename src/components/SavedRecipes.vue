<template>
  <div>
    <h1>Saved Recipes</h1>
    <div class="recipe-list">
      <RecipeCard
      v-for="recipe in savedRecipes"
      :key="recipe"
      :recipeId="recipe"
    />
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
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
