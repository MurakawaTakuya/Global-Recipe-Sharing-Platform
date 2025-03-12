<template>
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
  <div class="recipe-list">
    <RecipeCard recipeId="9c3125d9-e249-4faf-81d4-7a4f6cee4f00" />
    <RecipeCard recipeId="7fbaa71a-f351-4298-b353-4e20f2a8176d" />
    <RecipeCard recipeId="6393a233-09fc-44c1-a872-e98582e072a3" />
    <RecipeCard recipeId="30bc8a25-ba5a-4926-8eb7-cc70a0bfe5c5" />
  </div>
</template>

<script>
import { supabase } from '../supabase';
import RecipeCard from './RecipeCard.vue';
import RecipeCarousel from './RecipeCarousel.vue';

export default {
  name: 'RecipeTop',
  components: { RecipeCard, RecipeCarousel },
  data() {
    return {
      carouselRecipesJapan: [],
      carouselRecipesFrance: [],
    };
  },
  mounted() {
    this.fetchCarouselRecipes();
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

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
