<script setup>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <NavigationBar />
  <router-view></router-view>
  <Footer />
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
