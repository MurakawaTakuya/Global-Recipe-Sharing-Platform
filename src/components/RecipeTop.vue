<template>
  <div class="recipe-list">
    <RecipeCard recipeId="a4d180d2-8bb3-46eb-892d-61a2927411b1" />
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
