<template>
  <div class="recipe-list">
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
  </div>
</template>

<script>
import AddRecipe from './AddRecipe.vue'
import GetRecipes from './GetRecipes.vue'
import RecipeCard from './RecipeCard.vue'
export default {
  name: 'RecipeTop',
  components: {
    RecipeCard,
}
</script>

<style>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
