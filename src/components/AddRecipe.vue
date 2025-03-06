<template>
  <div>
    <button @click="addRecipe">レシピを追加</button>
  </div>
</template>

<script setup>
import { supabase } from '../supabase'

const addRecipe = async () => {
  const { data, error } = await supabase.from('recipes').insert({
    name: 'フライドチキン',
    country: 0,
    description: '大人も子供も好きなフライドチキン',
    ingredients: ['鶏肉', '小麦粉', '塩', '油'],
    instructions: [
      { step: '鶏肉に塩を振る', photo: 'https://example.com/photo-step1.jpg' },
      { step: '衣をつける', photo: 'https://example.com/photo-step2.jpg' },
      { step: '油で揚げる', photo: 'https://example.com/photo-step3.jpg' },
    ],
  })

  if (error) {
    console.error('挿入エラー:', error)
  } else {
    console.log('挿入成功:', data)
  }
}
</script>
