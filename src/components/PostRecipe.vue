<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div>
    <AddRecipe />
  </div>
</template>

<script>
import AddRecipe from './AddRecipe.vue';
export default {
  name: 'PostRecipe',
  components: {
    AddRecipe,
  },
};
</script>

<style></style>
