<template>
  <el-carousel indicator-position="outside" arrow="always">
    <el-carousel-item v-for="recipe in carouselRecipes" :key="recipe.id">
      <router-link :to="`/recipe/${recipe.id}`" class="carousel-item-link">
        <img :src="getImageUrl(recipe.topImage)" alt="Background Image" class="recipe-img" />
        <div class="recipe-details">
          <h2 text="2xl" justify="center">{{ recipe.name }}</h2>
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getImageUrl } from '../utils/getImage';

export default {
  name: 'RecipeCarousel',
  props: {
    carouselRecipes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImageUrl(filePath) {
      return getImageUrl(filePath);
    },
  },
};
</script>

<style>
.carousel-item-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

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

.recipe-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  --max-line: 2;
  -webkit-line-clamp: var(--max-line);
  line-clamp: var(--max-line);
}
</style>
