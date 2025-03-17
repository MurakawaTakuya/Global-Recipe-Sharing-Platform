<script setup>
import FooterComponent from './components/FooterComponent.vue';
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <NavigationBar />
  <router-view></router-view>
  <FooterComponent />
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
