<template>
  <!-- TODO: UI LibraryでCardの表示を変更 -->
  <!-- TODO: 画像読み込み中のskeletonを実装 -->
  <div class="recipe-card" v-if="recipe">
    <router-link class="img-object" :to="`/recipe/${recipe.id}`">
      <img :src="imageUrl" alt="" />
      <div>
        <h1>{{ recipe.name }}</h1>
        <p>{{ recipe.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { supabase } from '../supabase';
import { getImageUrl } from '../utils/getImage';

export default {
  name: 'RecipeCard',
  props: {
    recipeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipe: null,
    };
  },
  computed: {
    imageUrl() {
      // recipeがまだ取得できていない場合の対策
      return this.recipe ? getImageUrl(this.recipe.topImage) : '';
    },
  },
  mounted() {
    this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', this.recipeId)
        .single();
      if (error) {
        console.error('レシピ取得エラー:', error);
        return;
      }
      this.recipe = data;
    },
  },
};
</script>

<style>
.recipe-card {
  width: 48%;
  min-width: 300px;
}
.img-object {
  display: flex;
  position: relative;
  text-decoration: none;
  color: black;
  gap: 5px;
}
.img-object img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
