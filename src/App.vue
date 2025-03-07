<script setup></script>

<template>
  <div class="search-bar">
    <el-input
      v-model="searchQuery"
      style="width: 240px"
      :prefix-icon="'Search'"
      placeholder="Keyword"
      @keydown.enter="search"
    />
    <el-input-tag
      v-model="inputCategory"
      style="width: 240px"
      placeholder="Category"
      aria-label="Please click the Enter key after input"
      @keydown.enter="search"
    />

    <button class="search-button" @click="search">Search</button>
  </div>

  <router-view></router-view>
</template>

<script>
import { ref } from 'vue'
const inputCategory = ref('')

export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
      inputCategory: '',
    };
  },
  methods: {
    search() {
      this.$router.push({ name: 'SearchResults', params: { query: this.searchQuery } });
    },
  },
};
</script>

<style>
.search-bar {
  display: flex;
  justify-content: center;
}
</style>

<style scoped>
/* ボタンのデフォルトのスタイル */
.search-button {
  background-color: #FFA500;  /* ボタンの背景色 */
  color: white;                /* 文字色 */
  padding: 10px 20px;          /* パディング */
  border: none;                /* 枠線なし */
  border-radius: 4px;          /* 角丸 */
  cursor: pointer;             /* ポインタを表示 */
}

/* ボタンがホバーされたときの色 */
.search-button:hover {
  background-color: #FF8C00;
}

/* ボタンがフォーカスされたときのスタイル */
.search-button:focus {
  background-color: #E07B00;  /* 暗いオレンジ */
  outline: none;  /* フォーカスの枠線を消す */
  box-shadow: 0 0 0 2px rgba(224, 123, 0, 0.5);  /* フォーカス時の影 */
}
</style>
