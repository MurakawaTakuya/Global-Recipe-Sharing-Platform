<template>
  <div>
    <button @click="fetchRecipes">レシピを取得</button>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">{{ recipe.name }} - {{ recipe.country }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const recipes = ref([])

const fetchRecipes = async () => {
  const { data, error } = await supabase.from('recipes').select('*')

  if (error) {
    console.error('取得エラー:', error)
  } else {
    recipes.value = data
  }
}
</script>
