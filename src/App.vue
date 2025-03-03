<script>
export default {
  data() {
    return {
      options: {
        anchors: ['section1', 'section2', 'section3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec'],
      },
    }
  },
}
</script>

<template>
  <full-page ref="fullpage" :options="options">
    <!-- TODO: make component -->
    <div class="section">
      <!-- TODO: make component -->
      <div class="slide">
        <h1>hello</h1>
        <h2>hoge fuga</h2>
      </div>
      <div class="slide">スライド 2</div>
      <div class="slide">スライド 3</div>
    </div>
    <div class="section">Section 2: 別のコンテンツ</div>
    <div class="section">Section 3: さらに別のコンテンツ</div>
  </full-page>
</template>

<style>
/* 必要に応じてスタイルを追加 */
</style>
