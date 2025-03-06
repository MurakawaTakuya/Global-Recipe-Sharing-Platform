<template>
  <div>
    <button @click="getRecipes">レシピ一覧を取得</button>

    <div v-if="recipe">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <ul>
        <li v-for="(ing, index) in recipe.ingredients" :key="index">
          {{ ing }}
        </li>
      </ul>
      <SupabaseImage :recipe="recipe" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import SupabaseImage from './SupabaseImage.vue'

const recipe = ref(null)

const getRecipes = async () => {
  const { data, error } = await supabase.from('recipes').select('*')

  if (error) {
    console.error('取得エラー:', error)
  } else {
    console.log('取得したレシピ:', data)
    recipe.value = data[0]
  }
}
</script>
