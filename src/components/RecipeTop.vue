<template>
  <el-carousel indicator-position="outside" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>

  <div class="recipe-list">
    <RecipeCard recipeId="9c3125d9-e249-4faf-81d4-7a4f6cee4f00" />
    <RecipeCard recipeId="7fbaa71a-f351-4298-b353-4e20f2a8176d" />
    <RecipeCard recipeId="6393a233-09fc-44c1-a872-e98582e072a3" />
    <RecipeCard recipeId="30bc8a25-ba5a-4926-8eb7-cc70a0bfe5c5" />
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
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
