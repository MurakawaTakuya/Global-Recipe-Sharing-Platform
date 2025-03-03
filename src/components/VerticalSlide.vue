<template>
  <div class="section">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VerticalSlide',
}
</script>

<style scoped>
.section {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}
</style>
