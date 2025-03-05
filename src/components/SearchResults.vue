<template>
  <div>
    <router-link to="/">go home</router-link>
  </div>
  <div>
    <h1>Search Results for "{{ routeQuery }}"</h1>
    <!-- 検索結果を表示するためのコードをここに追加 -->
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  computed: {
    routeQuery() {
      return this.$route.params.query
    },
  },
}
</script>

<style scoped></style>
