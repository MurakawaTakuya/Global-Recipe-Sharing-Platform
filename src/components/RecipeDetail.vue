<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div v-if="recipe">
    <div class="recipe-image">
      <img v-if="recipe.topImage" :src="getImageUrl(recipe.topImage)" alt="" />
      <div class="recipe-title-and-category">
        <h1>{{ recipe.name }}</h1>
        <div v-if="recipe.category && recipe.category.length" class="categories">
          <ul>
            <li v-for="(cat, index) in recipe.category" :key="index">
              <el-tag type="info" size="large" class="category-tag">{{ cat }}</el-tag>
            </li>
          </ul>
        </div>
        <div v-if="averageRating !== null">
          <el-rate
            v-model="averageRating"
            size="large"
            show-score
            disabled
            text-color="#ff9900"
            :score-template="`${averageRating.toFixed(1)}`"
          />
        </div>
        <div v-if="!hasRated">
          <el-rate
            v-model="userRating"
            size="large"
            :texts="['1', '2', '3', '4', '5']"
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
          <el-button type="primary" @click="handleRatingSubmit">送信</el-button>
        </div>
      </div>
    </div>
    <div class="recipe-detail">
      <div class="ingredients">
        <h1>Ingredients</h1>
        <ul>
          <li v-for="(ing, index) in recipe.ingredients" :key="index">
            {{ ing.name }}: {{ ing.amount }}
          </li>
        </ul>
      </div>
      <div class="recipe">
        <h1>Recipe</h1>
        <el-timeline>
          <el-timeline-item
            v-for="(instruction, index) in recipe.instructions"
            :key="index"
            :timestamp="`Step ${index + 1}`"
            placement="top"
          >
            <el-card>
              <div class="recipe-step">
                <img v-if="instruction.photo" :src="getImageUrl(instruction.photo)" alt="" />
                <h3>{{ instruction.step }}</h3>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';
import { getImageUrl } from '../utils/getImage';
import { fetchAverageRating, submitRating } from '../utils/ratings';

const route = useRoute();
const recipe = ref(null);
const userRating = ref(0);
const averageRating = ref(null);
const hasRated = ref(false);

onMounted(async () => {
  const recipeKey = route.params.variable;
  const { data, error } = await supabase.from('recipes').select('*').eq('id', recipeKey).single();

  if (error) {
    console.error('データ取得エラー:', error);
  } else {
    recipe.value = data;
    averageRating.value = await fetchAverageRating(recipeKey);
    hasRated.value = localStorage.getItem(`rated_${recipeKey}`) === 'true';
  }
});

const handleRatingSubmit = async () => {
  const success = await submitRating(recipe.value.id, userRating.value);
  if (success) {
    averageRating.value = await fetchAverageRating(recipe.value.id);
    hasRated.value = true;
    localStorage.setItem(`rated_${recipe.value.id}`, 'true');
  }
};
</script>

<script>
export default {
  name: 'RecipeDetail',
  computed: {
    routeVariable() {
      return this.$route.params.variable;
    },
  },
};
</script>

<style scoped>
.recipe-image {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.recipe-image img {
  width: 30vw;
  border-radius: 15px;
  max-height: 50vh;
  object-fit: cover;
}
.recipe-title-and-category {
  margin: 0 0 auto;
}
.category-tag {
  color: black;
  font-size: 14px;
}
.recipe-detail {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 85%;
  margin: 20px auto;
}
.ingredients {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 20%;
}
.recipe {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
}
.categories {
  margin-top: 10px;
}
.categories ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}
.recipe-step {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px;
  justify-content: flex-start;
}
.recipe-step img {
  border-radius: 8px;
  width: 33%;
  max-height: 20vh;
  object-fit: cover;
}
.recipe-step h3 {
  margin: 3px 0;
}
</style>
