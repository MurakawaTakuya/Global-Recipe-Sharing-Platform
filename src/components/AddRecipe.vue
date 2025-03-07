<template>
  <router-link to="/">go home</router-link>
  <el-card class="form-container">
    <el-form :model="form">
      <el-form-item label="Recipe Name">
        <el-input v-model="form.name" placeholder="Enter recipe name" />
      </el-form-item>

      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" placeholder="Enter description" />
      </el-form-item>

      <el-form-item label="Category">
        <el-input-tag v-model="form.category" placeholder="Category" />
      </el-form-item>

      <!-- Top Image -->
      <el-form-item label="Top Image">
        <el-upload
          class="upload-demo"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleTopImageChange"
        >
          <el-button :type="form.topImage ? 'success' : 'primary'" plain>
            <el-icon><upload /></el-icon> Upload Image
          </el-button>
        </el-upload>
      </el-form-item>

      <!-- Country Selection (Radio) -->
      <el-form-item label="Country">
        <el-radio-group v-model="form.country">
          <el-radio :label="0">Japan</el-radio>
          <el-radio :label="1">France</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- Ingredients -->
      <el-card shadow="never" class="inner-card">
        <!-- TODO: paddingサイズ修正 -->
        <template #header>
          <div class="card-header">
            <span>Ingredients</span>
          </div>
        </template>
        <div v-for="(ingredient, index) in form.ingredients" :key="index" class="ingredient-item">
          <el-input v-model="form.ingredients[index]" placeholder="Enter ingredient" />
          <el-button
            type="danger"
            text
            @click="removeIngredient(index)"
            v-if="form.ingredients.length > 1"
          >
            Remove
          </el-button>
        </div>
        <div class="add-button-container">
          <el-button type="success" text @click="addIngredient">+ Add</el-button>
        </div>
      </el-card>

      <!-- Instructions -->
      <el-card shadow="never" class="inner-card instructions-container">
        <template #header>
          <div class="card-header">
            <span>Instructions</span>
          </div>
        </template>
        <div
          v-for="(instruction, index) in form.instructions"
          :key="index"
          class="instruction-item"
        >
          <el-form-item :label="'Step ' + (index + 1)" class="step-item">
            <el-input v-model="instruction.step" placeholder="Enter step description" />
          </el-form-item>
          <el-form-item label="Image" class="image-item">
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="(event) => handleInstructionFileChange(event, index)"
            >
              <el-button :type="instruction.photoFile ? 'success' : 'primary'" plain>
                Upload Image
              </el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="add-button-container">
          <el-button type="success" text @click="addInstruction">+ Add</el-button>
        </div>
      </el-card>

      <div class="submit-container">
        <el-button type="success" size="large" class="submit-button" @click="submitRecipe">
          Submit Recipe
        </el-button>
      </div>
      <NotificationPopup
        v-if="notification.message"
        :type="notification.type"
        :message="notification.message"
        :title="notification.title"
      />
    </el-form>
  </el-card>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inner-card {
  margin-top: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  padding: 10px;
}

.instructions-container {
  margin-bottom: 20px;
}

.ingredient-item {
  display: flex;
  margin: 5px 0;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  font-size: 18px;
  font-weight: bold;
  width: 100%;
}

.upload-demo .el-button {
  display: flex;
  align-items: center;
  gap: 5px;
}

.instruction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.step-item {
  flex: 1;
  margin: 3px 0;
}

.image-item {
  flex: 0 0 auto;
  margin: 0;
  align-items: center;
}

.add-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

<script setup>
import { uploadImage } from '@/utils/uploadImage';
import { reactive } from 'vue';
import { supabase } from '../supabase';
import NotificationPopup from './NotificationPopup.vue';

const form = reactive({
  name: '',
  description: '',
  country: 0, // 0 = Japan, 1 = France
  topImage: null,
  category: [],
  ingredients: [''],
  instructions: [{ step: '', photoFile: null, photoPath: '' }],
});

const notification = reactive({
  type: '',
  message: '',
  title: '',
});

const handleTopImageChange = (file) => {
  form.topImage = file.raw;
};

const handleInstructionFileChange = (file, index) => {
  form.instructions[index].photoFile = file.raw;
};

const addIngredient = () => {
  form.ingredients.push('');
};

const removeIngredient = (index) => {
  if (form.ingredients.length > 1) {
    form.ingredients.splice(index, 1);
  }
};

const addInstruction = () => {
  form.instructions.push({ step: '', photoFile: null, photoPath: '' });
};

const submitRecipe = async () => {
  if (!form.topImage) {
    notification.type = 'error';
    notification.title = 'Error';
    notification.message = 'Please upload a top image';
    return;
  }
  const topImagePath = await uploadImage(form.topImage);

  for (let i = 0; i < form.instructions.length; i++) {
    const instruction = form.instructions[i];
    if (instruction.photoFile) {
      const fileName = await uploadImage(instruction.photoFile);
      instruction.photoPath = fileName;
    }
  }

  const recipeData = {
    name: form.name,
    country: form.country,
    topImage: topImagePath,
    description: form.description,
    category: form.category,
    ingredients: form.ingredients,
    instructions: form.instructions.map((i) => ({
      step: i.step,
      photo: i.photoPath,
    })),
  };

  const { error } = await supabase.from('recipes').insert(recipeData);

  if (error) {
    notification.type = 'error';
    notification.title = 'Error';
    notification.message = 'Failed to add recipe';
  } else {
    notification.type = 'success';
    notification.title = 'Success';
    notification.message = 'Recipe added successfully';
  }
};
</script>
