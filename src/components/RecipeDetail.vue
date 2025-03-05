<template>
  <div class="recipe-image">
    <img src="/image.png" alt="">
    <h1>とんかつ</h1>
  </div>
  <div class="recipe-detail">
    <h1>ingredients</h1>
    <h1>recipe</h1>
  </div>

</template>

<script>
export default {
  name: 'RecipeDetail',
  created() {
    console.log('Recipe Component URLパラメータ:', this.$route.params.variable)
  },
  computed: {
    routeVariable() {
      return this.$route.params.variable
    },
  },
}
</script>

<style scoped>
.recipe-image {
  display: flex;
  justify-content: center;
    align-items: center;
}
.recipe-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
