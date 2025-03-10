<template>
  <!-- TODO: 画像読み込み中のskeletonを実装 -->
  <router-link class="recipe-card" :to="recipe ? `/recipe/${recipe.id}` : '#'">
    <el-skeleton class="skeleton" :loading="!recipe" animated>
      <!-- 読み込み中 -->
      <template #template>
        <el-skeleton-item class="skeleton-img" variant="image" />
        <div>
          <el-skeleton-item variant="h3" style="width: 50%" />
        </div>
        <div class="skeleton-text">
          <el-skeleton :rows="4" animated />
        </div>
      </template>

      <!-- 読み込み完了 -->
      <template #default>
        <div class="recipe-info">
          <img :src="imageUrl" alt="" />
          <div>
            <h1>{{ recipe.name }}</h1>
            <p>{{ recipe.description }}</p>
          </div>
        </div>
      </template>
    </el-skeleton>
    <!-- TODO: 保存ボタンを追加したい -->
    <!-- TODO: 国・タグの表示を追加 -->
  </router-link>
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
  text-decoration: none;
  color: black;
}

.recipe-card:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
}

.skeleton {
  display: flex;
  gap: 10px;
}

.skeleton-img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.recipe-info {
  display: flex;
  gap: 10px;
  height: 100%;
}

.recipe-card img,
.skeleton-img {
  min-width: 30%;
  max-width: 30%;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
}

.recipe-card h1,
.recipe-card p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recipe-card h1 {
  -webkit-line-clamp: 1;
  line-clamp: 1;
}
.recipe-card p {
  -webkit-line-clamp: 6;
  line-clamp: 6;
}

.skeleton-text {
  width: 100%;
}
</style>
