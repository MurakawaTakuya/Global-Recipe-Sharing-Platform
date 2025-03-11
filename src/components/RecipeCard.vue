<template>
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
            <div class="title-and-save-button">
              <h1>{{ recipe.name }}</h1>
              <el-button v-if="isSaved" type="success" @click.stop.prevent="toggleSave">
                保存済み
              </el-button>
              <el-button v-else type="warning" plain @click.stop.prevent="toggleSave">
                保存する
              </el-button>
            </div>

            <divc class="star-and-country">
              <el-rate
                v-if="averageRating !== null"
                v-model="averageRating"
                size="small"
                disabled
                show-score
                text-color="#ff9900"
                :score-template="`${averageRating.toFixed(1)}`"
              />
              <span v-if="recipe.country === 0">Japan</span>
              <span v-else-if="recipe.country === 1">France</span>
            </divc>

            <p>{{ recipe.description }}</p>
          </div>
        </div>
      </template>
    </el-skeleton>
  </router-link>
</template>

<script>
import { supabase } from '../supabase';
import { getImageUrl } from '../utils/getImage';
import { fetchAverageRating } from '../utils/ratings';
import { checkSaved, toggleSave } from '../utils/saveRecipe';

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
      averageRating: null,
      isSaved: false,
    };
  },
  computed: {
    imageUrl() {
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
      this.fetchRating();
      this.checkSaved();
    },
    async fetchRating() {
      const avg = await fetchAverageRating(this.recipe.id);
      this.averageRating = avg;
    },
    checkSaved() {
      this.isSaved = checkSaved(this.recipe.id);
    },
    toggleSave() {
      this.isSaved = toggleSave(this.recipe.id, this.isSaved);
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
  position: relative;
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
  gap: 15px;
  height: 100%;
}

.recipe-info > div {
  width: 100%;
}

.title-and-save-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.star-and-country {
  display: flex;
  gap: 10px;
  align-items: center;
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
  --max-line-h1: 1;
  -webkit-line-clamp: var(--max-line-h1);
  line-clamp: var(--max-line-h1);
  padding-bottom: 5px;
  line-height: 1.1;
}
.recipe-card p {
  --max-line-p: 5;
  -webkit-line-clamp: var(--max-line-p);
  line-clamp: var(--max-line-p);
}

.skeleton-text {
  width: 100%;
}
</style>
