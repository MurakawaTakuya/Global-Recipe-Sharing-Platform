<template>
  <el-card class="form-container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Recipe Name">
        <el-input v-model="form.name" placeholder="Enter recipe name" />
      </el-form-item>

      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" placeholder="Enter description" />
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
          <el-button type="primary" plain>
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
        <template #header>
          <div class="card-header">
            <span>Ingredients</span>
            <el-button type="success" text @click="addIngredient">+ Add</el-button>
          </div>
        </template>
        <div v-for="(ingredient, index) in form.ingredients" :key="index" class="ingredient-item">
          <el-input v-model="form.ingredients[index]" placeholder="Enter ingredient" />
          <el-button type="danger" text @click="removeIngredient(index)" v-if="form.ingredients.length > 1">
            Remove
          </el-button>
        </div>
      </el-card>

      <!-- Instructions -->
      <el-card shadow="never" class="inner-card instructions-container">
        <template #header>
          <div class="card-header">
            <span>Instructions</span>
            <el-button type="success" text @click="addInstruction">+ Add</el-button>
          </div>
        </template>
        <div v-for="(instruction, index) in form.instructions" :key="index">
          <el-form-item :label="'Step ' + (index + 1)">
            <el-input v-model="instruction.step" placeholder="Enter step description" />
          </el-form-item>
          <el-form-item label="Image">
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="(event) => handleInstructionFileChange(event, index)"
            >
              <el-button type="primary" plain>
                <el-icon><upload /></el-icon> Upload Image
              </el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-card>

      <!-- Submitボタンのコンテナ -->
      <div class="submit-container">
        <el-button type="success" size="large" class="submit-button" @click="submitRecipe">
          🚀 Submit Recipe
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>
/* フォーム全体を囲う */
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 各セクションをカード風に */
.inner-card {
  margin-top: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  padding: 10px;
}

/* Instructionsの領域とSubmitボタンの間に余白を追加 */
.instructions-container {
  margin-bottom: 20px;
}

/* Submitボタンのコンテナ */
.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Submitボタンを中央に配置し、目立たせる */
.submit-button {
  font-size: 18px;
  font-weight: bold;
  width: 100%;
}

/* 画像アップロードボタン */
.upload-demo .el-button {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  description: '',
  country: 0, // 0 = Japan, 1 = France
  ingredients: [''],
  instructions: [{ step: '', photoFile: null, photoPath: '' }],
});

// Ingredientsの追加
const addIngredient = () => {
  form.ingredients.push('');  // 新しい空のingredientを追加
};

// Ingredientsの削除
const removeIngredient = (index) => {
  if (form.ingredients.length > 1) {
    form.ingredients.splice(index, 1);  // 指定されたindexのingredientを削除
  }
};

// Instructionsの追加
const addInstruction = () => {
  form.instructions.push('');  // 新しい空のinstructionを追加
};

// Instructionsの削除
const removeInstruction = (index) => {
  if (form.instructions.length > 1) {
    form.instructions.splice(index, 1);  // 指定されたindexのinstructionを削除
  }
};
</script>
