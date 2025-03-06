<template>
  <div class="recipe-list">
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
  </div>
  <div>
    <router-link to="/post">post</router-link>
  </div>

  <GetRecipes />
</template>

<script>
import GetRecipes from './GetRecipes.vue'
import RecipeCard from './RecipeCard.vue'
export default {
  name: 'RecipeTop',
  components: {
    RecipeCard,
    GetRecipes,
  },
}
</script>

<style>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
