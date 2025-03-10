<!-- TODO: 検索ワードが無い場合にポップアップを出す -->
<template>
  <div class="search-bar">
    <el-input
      v-model="searchQuery"
      :prefix-icon="'Search'"
      placeholder="Search by Name"
      @keydown.enter="search"
    />
    <el-input-tag v-model="inputCategory" placeholder="Category" />
    <el-select v-model="selectedCountry" placeholder="Country">
      <el-option label="Not Specified" value="" />
      <el-option label="Japan" value="0" />
      <el-option label="France" value="1" />
    </el-select>
    <button class="search-button" @click="search">Search</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      inputCategory: '',
      selectedCountry: '',
    };
  },
  methods: {
    search() {
      if (!this.searchQuery && !this.inputCategory && !this.selectedCountry) {
        alert('Please enter name, category, or country.');
        return;
      }
      const params = {};
      if (this.searchQuery) {
        params.name = this.searchQuery;
      }
      if (this.inputCategory) {
        params.category = this.inputCategory;
      }
      if (this.selectedCountry !== '') {
        params.country = this.selectedCountry;
      }
      this.$router.push({ name: 'SearchResults', query: params });
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
}

.search-button {
  background-color: #ffa500;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.search-button:hover {
  background-color: #ff8c00;
}

.search-button:focus {
  background-color: #e07b00;
  outline: none;
  box-shadow: 0 0 0 2px rgba(224, 123, 0, 0.5);
}
</style>
