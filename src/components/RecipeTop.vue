<template>
  <!-- TODO: 日本とフランスで左右に並べる -->
  <el-carousel indicator-position="outside" arrow="always">
    <el-carousel-item v-for="recipe in carouselRecipes" :key="recipe.id">
      <img :src="getImageUrl(recipe.topImage)" alt="Background Image" class="recipe-img" />
      <div class="recipe-details">
        <h3 text="2xl" justify="center">{{ recipe.name }}</h3>
        <p>{{ recipe.description }}</p>
      </div>
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
import { supabase } from '../supabase';
import { getImageUrl } from '../utils/getImage';
import RecipeCard from './RecipeCard.vue';

export default {
  name: 'RecipeTop',
  components: { RecipeCard },
  data() {
    return {
      carouselRecipes: [],
    };
  },
  mounted() {
    this.fetchCarouselRecipes();
  },
  methods: {
    async fetchCarouselRecipes() {
      const recipeIds = [
        '9c3125d9-e249-4faf-81d4-7a4f6cee4f00',
        '7fbaa71a-f351-4298-b353-4e20f2a8176d',
        '6393a233-09fc-44c1-a872-e98582e072a3',
        '30bc8a25-ba5a-4926-8eb7-cc70a0bfe5c5',
      ];
      const { data, error } = await supabase.from('recipes').select('*').in('id', recipeIds);
      if (error) {
        console.error('Error while loading data:', error);
        return;
      }
      this.carouselRecipes = data;
    },
    getImageUrl(filePath) {
      return getImageUrl(filePath);
    },
  },
};
</script>

<style>
.recipe-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.recipe-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
