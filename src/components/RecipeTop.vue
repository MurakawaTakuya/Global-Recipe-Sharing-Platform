<template>
  <div class="recipe-list">
    <RecipeCard recipeId="a4d180d2-8bb3-46eb-892d-61a2927411b1" />
  </div>
  <div>
    <router-link to="/post">post</router-link>
  </div>

  <el-button>I am ElButton</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>

  <GetRecipes />
</template>

<script>
import GetRecipes from './GetRecipes.vue';
import RecipeCard from './RecipeCard.vue';
export default {
  name: 'RecipeTop',
  components: { RecipeCard, GetRecipes },
};
</script>

<style>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
