<template>
  <div class="search-bar">
    <input type="text" />
    <button>検索</button>
  </div>
  <div class="recipe-list">
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
  </div>

  <router-view></router-view>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
export default {
  name: 'App',
  components: {
    RecipeCard,
  },
  created() {
    // console.log( 'URLパラメータ:', this.$route.params.variable)
  },
}
</script>

<style>
.search-bar {
  display: flex;
  justify-content: center;
}
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
