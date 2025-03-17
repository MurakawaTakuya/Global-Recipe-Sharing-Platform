<template>
  <div>
    <div class="carousel-container">
      <div>
        <h1>Japan</h1>
        <RecipeCarousel :carouselRecipes="carouselRecipesJapan" />
      </div>
      <div>
        <h1>France</h1>
        <RecipeCarousel :carouselRecipes="carouselRecipesFrance" />
      </div>
    </div>

    <RecommendCategory />

    <h1 class="order-title">Recipes ordered by average rating</h1>
    <div class="recipe-list">
      <RecipeCard v-for="recipe in sortedRecipes" :key="recipe.id" :recipeId="recipe.id" />
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase';
import { fetchAverageRating } from '../utils/ratings';
import RecipeCard from './RecipeCard.vue';
import RecipeCarousel from './RecipeCarousel.vue';
import RecommendCategory from './RecommendCategory.vue';

export default {
  name: 'RecipeTop',
  components: { RecipeCard, RecipeCarousel, RecommendCategory },
  data() {
    return {
      carouselRecipesJapan: [],
      carouselRecipesFrance: [],
      allRecipes: [],
    };
  },
  computed: {
    sortedRecipes() {
      return [...this.allRecipes].sort((a, b) => b.averageRating - a.averageRating);
    },
  },
  mounted() {
    this.fetchCarouselRecipes();
    this.fetchAllRecipes();
  },
  methods: {
    async fetchCarouselRecipes() {
      const japanRecipeIds = [
        '9c3125d9-e249-4faf-81d4-7a4f6cee4f00',
        '8d4e4e76-c54b-4418-bb2c-c9ee95d8856b',
        '4a5e977f-1253-4038-99f8-cef79ac27f53',
        '06dc41e7-67b3-471b-941f-1db66d216932',
      ];
      const franceRecipeIds = [
        'e4d6882b-8ad6-43e1-b7a7-2d82ee46b446',
        '5eb14236-cc95-4726-a5e0-1fbb4aa5522f',
        'b3021177-fb63-44d4-809b-65d6284a2165',
        '30bc8a25-ba5a-4926-8eb7-cc70a0bfe5c5',
      ];

      const { data: japanData, error: japanError } = await supabase
        .from('recipes')
        .select('*')
        .in('id', japanRecipeIds);
      if (japanError) {
        console.error('Error while loading Japan recipes:', japanError);
        return;
      }
      this.carouselRecipesJapan = japanRecipeIds.map((id) =>
        japanData.find((recipe) => recipe.id === id),
      );

      const { data: franceData, error: franceError } = await supabase
        .from('recipes')
        .select('*')
        .in('id', franceRecipeIds);
      if (franceError) {
        console.error('Error while loading France recipes:', franceError);
        return;
      }
      this.carouselRecipesFrance = franceRecipeIds.map((id) =>
        franceData.find((recipe) => recipe.id === id),
      );
    },
    async fetchAllRecipes() {
      const { data, error } = await supabase.from('recipes').select('*');
      if (error) {
        console.error('Error while loading all recipes:', error);
        return;
      }
      this.allRecipes = await Promise.all(
        data.map(async (recipe) => {
          const averageRating = await fetchAverageRating(recipe.id);
          return { ...recipe, averageRating };
        }),
      );
    },
  },
};
</script>

<style>
.carousel-container {
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
}

.carousel-container h1 {
  text-align: center;
  margin-bottom: 5px;
}

.carousel-container > div {
  width: 40%;
}

.order-title {
  margin: 20px 0 10px;
  text-align: center;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 0 0 15px;
}

@media (max-width: 600px) {
  .carousel-container {
    flex-direction: column;
  }

  .carousel-container > div {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
