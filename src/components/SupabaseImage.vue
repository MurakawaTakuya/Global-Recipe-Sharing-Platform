<template>
  <div v-if="recipe">
    <div v-for="(instruction, index) in recipe.instructions" :key="index">
      <p>{{ instruction.step }}</p>
      <img v-if="instruction.photo" :src="getImageUrl(instruction.photo)" alt="手順画像" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { supabase } from '../supabase';

const { recipe } = defineProps({
  recipe: Object,
});

const getImageUrl = (filePath) => {
  return supabase.storage.from('recipe-images').getPublicUrl(filePath).data.publicUrl;
};
</script>
