<template>
  <div class="img-object">
    <router-link to="/aaaaa"><img src="/image.png" alt=""></router-link>
    <p>text</p>
  </div>
</template>

<script>
export default {
  name: 'RecipeCard',
}
</script>

<style>
  .img-object {
    display: flex;
    margin: 5px;
    position: relative;
  }
  .img-object p {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
  }
</style>
