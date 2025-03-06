<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div class="search-result">
    <h1>Search Results for "{{ routeQuery }}"</h1>
  </div>
  <div class="search-list">
    <!-- 検索結果を表示するためのコードをここに追加 -->
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
    <RecipeCard/>
  </div>
</template>

<script>
import RecipeCard from "./RecipeCard.vue"
export default {
  name: 'SearchResults',
  components: {
    RecipeCard,
  },
  computed: {
    routeQuery() {
      return this.$route.params.query
    },
  },
}
</script>

<style scoped>
  .search-result {
    text-align: center;
  }
  .search-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
