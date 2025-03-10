<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <NavigationBar />
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
