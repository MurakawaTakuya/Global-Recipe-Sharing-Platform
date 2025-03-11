<template>
  <div v-if="recipe">
    <!-- Recipe Image -->
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

        <!-- Rating Display -->
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
        <!-- Rating Vote -->
        <div class="vote-rating" v-if="!hasRated">
          <el-rate
            v-model="userRating"
            size="large"
            :texts="['1', '2', '3', '4', '5']"
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
          <el-button type="success" @click="handleRatingSubmit">Submit</el-button>
        </div>

        <el-button v-if="isSaved" type="success" @click.stop.prevent="handleToggleSave">
          保存済み
        </el-button>
        <el-button v-else type="warning" plain @click.stop.prevent="handleToggleSave">
          保存する
        </el-button>
      </div>
    </div>

    <div class="recipe-detail">
      <!-- Ingredients -->
      <div class="ingredients">
        <h1>Ingredients</h1>
        <el-table :data="recipe.ingredients">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="amount" label="Amount">
            <template #default="scope">
              {{ scope.row.amount || '-' }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- Instructions -->
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
  <!-- TODO: loading design -->
  <div v-else>Loading...</div>
  <NotificationPopup
    v-if="showNotification"
    :type="notificationType"
    :message="notificationMessage"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';
import { getImageUrl } from '../utils/getImage';
import { fetchAverageRating, submitRating } from '../utils/ratings';
import { checkSaved, toggleSave as saveToggle } from '../utils/saveRecipe';
import NotificationPopup from './NotificationPopup.vue';

const route = useRoute();
const recipe = ref(null);
const userRating = ref(0);
const averageRating = ref(null);
const hasRated = ref(true);
const isSaved = ref(false);
const showNotification = ref(false);
const notificationType = ref('success');
const notificationMessage = ref('');

onMounted(async () => {
  const recipeKey = route.params.variable;
  const { data, error } = await supabase.from('recipes').select('*').eq('id', recipeKey).single();

  if (error) {
    console.error('Data fetch error:', error);
  } else {
    recipe.value = data;
    averageRating.value = await fetchAverageRating(recipeKey);
    hasRated.value = localStorage.getItem(`rated_${recipeKey}`) === 'true';
    isSaved.value = checkSaved(recipeKey);
  }
});

const handleRatingSubmit = async () => {
  const success = await submitRating(recipe.value.id, userRating.value);
  if (success) {
    averageRating.value = await fetchAverageRating(recipe.value.id);
    hasRated.value = true;
    localStorage.setItem(`rated_${recipe.value.id}`, 'true');
    notificationType.value = 'success';
    notificationMessage.value = 'Rating submitted successfully.';
  } else {
    notificationType.value = 'error';
    notificationMessage.value = 'Failed to submit rating.';
  }
  showNotification.value = true;
};

const handleToggleSave = () => {
  isSaved.value = saveToggle(recipe.value.id, isSaved.value);
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

.vote-rating {
  display: flex;
  align-items: center;
  gap: 13px;
}

.recipe-detail {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 85%;
  margin: 20px auto;
}

.ingredients {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 35%;
  gap: 10px;
}

.recipe {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  gap: 10px;
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
