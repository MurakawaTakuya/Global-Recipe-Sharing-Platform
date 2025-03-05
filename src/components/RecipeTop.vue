<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" />
    <button @click="search">検索</button>
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
import RecipeCard from './RecipeCard.vue'
export default {
  name: 'RecipeTop',
  components: {
    RecipeCard,
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    search() {
      this.$router.push({ name: 'SearchResults', params: { query: this.searchQuery } })
    },
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
