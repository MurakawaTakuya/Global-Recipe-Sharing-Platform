<script setup>
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <SearchBar />
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
