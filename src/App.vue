<script setup></script>

<template>
  <div class="search-bar">
    <el-input
      v-model="searchQuery"
      style="width: 240px"
      :prefix-icon="'Search'"
      placeholder="Keyword"
      @keydown.enter="search"
    />
    <el-input-tag
      v-model="inputCategory"
      style="width: 240px"
      placeholder="Category"
      aria-label="Please click the Enter key after input"
    />

    <button class="search-button" @click="search">Search</button>
  </div>

  <router-view></router-view>
</template>

<script>
import { ref } from 'vue';
const inputCategory = ref('');

export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
      inputCategory: '',
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

<style scoped>
.search-button {
  background-color: #ffa500;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ff8c00;
}

.search-button:focus {
  background-color: #e07b00;
  outline: none;
  box-shadow: 0 0 0 2px rgba(224, 123, 0, 0.5);
}
</style>
