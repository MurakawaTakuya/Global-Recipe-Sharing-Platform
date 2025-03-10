<script setup>
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <SearchBar />
  <!-- TODO: SearchBarをNavigationBarにして統合してもOK -->
  <router-link to="/post">
    <button>Post</button>
  </router-link>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.search-bar {
  display: flex;
  justify-content: center;
}
</style>
