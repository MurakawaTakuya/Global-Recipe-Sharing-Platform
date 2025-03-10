<template>
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
  height: 210px;
  border: thin solid #ebebeb;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
}
.recipe-card:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
}
.img-object {
  display: flex;
  position: relative;
  text-decoration: none;
  color: black;
  gap: 10px;
  height: 100%;
}
.img-object img {
  min-width: 30%;
  max-width: 30%;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
}
.img-object p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 6;
  line-clamp: 6;
}
</style>
