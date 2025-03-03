<!-- 横方向のスライド -->
<template>
  <div class="slide">
    <div class="slide-container">
      <img src="https://placehold.jp/800x600.png" alt="slide" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalSlide',
}
</script>

<style scoped>
.slide {
  padding: 0 80px;
}
.slide img {
  width: 80%;
  height: auto;
  max-height: 50vh;
  object-fit: contain;
}
.slide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
