<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div v-if="recipe">
    <div class="recipe-image">
      <img :src="getImageUrl(recipe.topImage)" alt="" />
      <h1>{{ recipe.name }}</h1>
    </div>
    <div class="recipe-detail">
      <div class="ingredients">
        <h1>Ingredients</h1>
        <ul>
          <li v-for="(ing, index) in recipe.ingredients" :key="index">
            {{ ing }}
          </li>
        </ul>
      </div>
      <div class="recipe">
        <h1>Recipe</h1>
        <div class="recipe-steps-summary">
          <div class="recipe-step" v-for="(instruction, index) in recipe.instructions" :key="index">
            <h2>{{ index + 1 }}</h2>
            <img :src="getImageUrl(instruction.photo)" alt="" />
            <h3>{{ instruction.step }}</h3>
          </div>
        </div>
        <!-- TODO: 画像を追加できないみたいなので、別のStepperを追加 -->
        <!-- <el-steps
          v-if="recipe.instructions"
          style="max-width: 600px"
          :active="100"
          direction="vertical"
          align-center
        >
          <el-step
            v-for="(instruction, index) in recipe.instructions"
            :key="index"
            :title="`Step ${index + 1}`"
            :description="instruction.step"
          />
        </el-steps> -->
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
  created() {
    console.log('Recipe Component URLパラメータ:', this.$route.params.variable);
  },
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
  gap: 30px;
  padding: 0 30px;
}
.recipe-steps-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.ingredients {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.recipe {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recipe-step {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
</style>
