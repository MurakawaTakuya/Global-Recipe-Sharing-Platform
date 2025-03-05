<template>
  <div class="recipe-image">
    <img src="/image.png" alt="" />
    <h1>とんかつ</h1>
  </div>
  <div class="recipe-detail">
    <div class="ingredients">
      <h1>ingredients</h1>
        <h2>1.meat</h2>
        <h2>2.bread crumbs</h2>
    </div>
    <div class="recipe">
        <h1>recipe</h1>
        <div class="recipe-steps-summary">
          <div class="recipe-step">
            <h2>1</h2>
            <img src="/image.png" alt="">
            <h3>something</h3>
          </div>
          <div class="recipe-step">
            <h2>2</h2>
            <img src="/image.png" alt="">
            <h3>something</h3>
          </div>
          <div class="recipe-step">
            <h2>3</h2>
            <img src="/image.png" alt="">
            <h3>something</h3>
          </div>
          <div class="recipe-step">
            <h2>4</h2>
            <img src="/image.png" alt="">
            <h3>something</h3>
          </div>
      </div>

    </div>
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
  justify-content: space-between;
  flex-direction: row;
  gap: 30px;
  padding: 0 30px;
}
.recipe-steps-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.ingredients {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.recipe {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-step{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
</style>
