<script setup></script>

<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" @keydown.enter="search" />
    <button @click="search">検索</button>
  </div>

  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    search() {
      this.$router.push({ name: 'SearchResults', params: { query: this.searchQuery } });
    },
  },
};
</script>

<style>
.search-bar {
  display: flex;
  justify-content: center;
}
</style>
