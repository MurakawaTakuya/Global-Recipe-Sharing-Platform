<template>
  <div>
    <input v-model="name" placeholder="Recipe Name" />
    <input v-model="description" placeholder="Description" />

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
      <input type="file" @change="(event) => handleFileChange(event, index)" />
    </div>

    <button @click="addInstruction">Add Step</button>
    <button @click="submitRecipe">Submit Recipe</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const name = ref('');
const description = ref('');
const country = ref(0); // Default is Japan (0), 1 is for France
const ingredients = ref(['']);
const instructions = ref([{ step: '', photoFile: null, photoPath: '' }]);

const countries = {
  Japan: 0,
  France: 1,
};

const handleFileChange = (event, index) => {
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
  // Upload images
  for (let i = 0; i < instructions.value.length; i++) {
    const instruction = instructions.value[i];

    if (instruction.photoFile) {
      const photoPath = `${Date.now()}_${instruction.photoFile.name}`;
      const { error } = await supabase.storage
        .from('recipe-images')
        .upload(photoPath, instruction.photoFile);

      if (error) {
        console.error('Image upload failed:', error);
        return;
      }

      instruction.photoPath = photoPath;
    }
  }

  // Insert into database
  const recipeData = {
    name: name.value,
    country: country.value,
    topImage: topImage,
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
