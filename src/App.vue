<template>
  <full-page ref="fullpage" :options="options">
    <!-- 1つ目の VerticalSlide 内に複数の HorizontalSlide を配置 -->
    <VerticalSlide>
      <HorizontalSlide>
        <h1>hello</h1>
        <h2>hoge fuga</h2>
      </HorizontalSlide>
      <HorizontalSlide> スライド 2 </HorizontalSlide>
      <HorizontalSlide> スライド 3 </HorizontalSlide>
      <!-- 横スライド用のナビゲーションボタン追加
      <div class="slide-nav">
      </div> -->
    </VerticalSlide>
    <!-- 他の VerticalSlide -->
    <VerticalSlide> Section 2: 別のコンテンツ </VerticalSlide>
    <VerticalSlide> Section 3: さらに別のコンテンツ </VerticalSlide>
  </full-page>
</template>

<script>
import HorizontalSlide from './components/HorizontalSlide.vue'
import VerticalSlide from './components/VerticalSlide.vue'

export default {
  name: 'App',
  components: {
    VerticalSlide,
    HorizontalSlide,
  },
  data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HERE',
        anchors: ['section1', 'section2', 'section3'],
      },
    }
  },
}
</script>

<style></style>
