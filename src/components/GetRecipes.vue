<template>
  <div>
    <button @click="getRecipes">レシピ一覧を取得</button>
  </div>
</template>

<script setup>
import { supabase } from '../supabase'

const getRecipes = async () => {
  const { data, error } = await supabase.from('recipes').select('*')

  if (error) {
    console.error('取得エラー:', error)
  } else {
    console.log('取得したレシピ:', data)
  }
}
</script>
