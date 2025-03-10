<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div v-if="recipe">
    <div class="recipe-image">
      <img :src="getImageUrl(recipe.topImage)" alt="" />
      <h1>{{ recipe.name }}</h1>
      <div v-if="recipe.category && recipe.category.length" class="categories">
        <h2>Categories:</h2>
        <ul>
          <li v-for="(cat, index) in recipe.category" :key="index">{{ cat }}</li>
        </ul>
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

const route = useRoute();
const recipe = ref(null);

onMounted(async () => {
  const recipeKey = route.params.variable;
  const { data, error } = await supabase.from('recipes').select('*').eq('id', recipeKey).single();

  if (error) {
    console.error('データ取得エラー:', error);
  } else {
    recipe.value = data;
  }
});
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
}
.recipe-image img {
  width: 20vw;
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
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.recipe-step img {
  border-radius: 8px;
  width: 33%;
  max-height: 20vh;
  object-fit: cover;
}
</style>
