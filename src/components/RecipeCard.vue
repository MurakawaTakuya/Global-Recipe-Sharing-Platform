<template>
  <!-- TODO: デザイン変更 -->
  <div class="img-object">
    <router-link :to="`/recipe/${recipe.id}`">
      <img :src="imageUrl" alt="" />
    </router-link>
    <p>{{ recipe.name }} - {{ recipe.description }}</p>
  </div>
</template>

<script>
import { getImageUrl } from '../utils/getImage';

export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return getImageUrl(this.recipe.topImage);
    },
  },
};
</script>

<style>
.img-object {
  display: flex;
  margin: 5px;
  position: relative;
}
.img-object img {
  width: 30vw;
  object-fit: cover;
}
.img-object p {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
}
</style>
