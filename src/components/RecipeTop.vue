<template>
  <div class="recipe-list">
    <RecipeCard recipeId="9c3125d9-e249-4faf-81d4-7a4f6cee4f00" />
    <RecipeCard recipeId="7fbaa71a-f351-4298-b353-4e20f2a8176d" />
    <RecipeCard recipeId="6393a233-09fc-44c1-a872-e98582e072a3" />
  </div>
  <div>
    <router-link to="/post">post</router-link>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';
export default {
  name: 'RecipeTop',
  components: { RecipeCard },
};
</script>

<style>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
