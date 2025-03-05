<template>
  <div>
    <h1>Recipe Component</h1>
    <p>URLパラメータ: {{ routeVariable }}</p>
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
/* スタイルを追加する場合はここに記述 */
</style>
