<template>
  <div>
    <input v-model="name" placeholder="Recipe Name" />
    <input v-model="description" placeholder="Description" />

    <!-- Top Image -->
    <div>
      <input type="file" @change="(event) => handleTopImageChange(event, 0)" />
    </div>

    <!-- Country Selection -->
    <select v-model="country">
      <option v-for="(code, name) in countries" :key="code" :value="code">
        {{ name }}
      </option>
    </select>

    <!-- Ingredients Input -->
    <div v-for="(ingredient, index) in ingredients" :key="index">
      <input v-model="ingredients[index]" placeholder="Ingredient" />
      <button @click="removeIngredient(index)" v-if="ingredients.length > 1">Remove</button>
    </div>
    <button @click="addIngredient">Add Ingredient</button>

    <!-- Instructions Input -->
    <div v-for="(instruction, index) in instructions" :key="index">
      <input v-model="instruction.step" placeholder="Step" />
      <input type="file" @change="(event) => handleInstructionFileChange(event, index)" />
    </div>

    <button @click="addInstruction">Add Step</button>
    <button @click="submitRecipe">Submit Recipe</button>
  </div>
</template>

<script setup>
import { uploadImage } from '@/utils/uploadImage';
import { ref } from 'vue';
import { supabase } from '../supabase';

const name = ref('');
const description = ref('');
const topImage = ref(null);
const country = ref(0); // Default is Japan (0), 1 is for France
const ingredients = ref(['']);
const instructions = ref([{ step: '', photoFile: null, photoPath: '' }]);

const countries = {
  Japan: 0,
  France: 1,
};

const handleTopImageChange = (event) => {
  topImage.value = event.target.files[0];
};

const handleInstructionFileChange = (event, index) => {
  instructions.value[index].photoFile = event.target.files[0];
};

const addIngredient = () => {
  ingredients.value.push('');
};

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1);
};

const addInstruction = () => {
  instructions.value.push({ step: '', photoFile: null, photoPath: '' });
};

const submitRecipe = async () => {
  // topImageをアップロード
  const topImageFile = topImage.value;
  if (!topImageFile) {
    console.error('Please upload a top image');
    return;
  }
  const topImagePath = await uploadImage(topImageFile);

  // Upload images
  for (let i = 0; i < instructions.value.length; i++) {
    const instruction = instructions.value[i];

    if (instruction.photoFile) {
      const fileName = await uploadImage(instruction.photoFile);

      instruction.photoPath = fileName;
    }
  }

  // Insert into database
  const recipeData = {
    name: name.value,
    country: country.value,
    topImage: topImagePath,
    description: description.value,
    ingredients: ingredients.value,
    instructions: instructions.value.map((i) => ({
      step: i.step,
      photo: i.photoPath,
    })),
  };

  const { error } = await supabase.from('recipes').insert(recipeData);

  if (error) {
    console.error('Recipe insert error:', error);
  } else {
    console.log('Recipe added successfully');
  }
};
</script>
