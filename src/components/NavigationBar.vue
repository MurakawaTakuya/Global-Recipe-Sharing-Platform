<script setup>
import { AnOutlinedHome } from '@kalimahapps/vue-icons';
</script>

<!-- TODO: 検索ワードが無い場合にポップアップを出す -->
<template>
  <div class="navigation-bar">
    <router-link to="/">
      <AnOutlinedHome class="home-icon" />
    </router-link>

    <el-input
      class="search-input"
      v-model="searchQuery"
      placeholder="Search by Name"
      @keydown.enter="search"
    />
    <el-input-tag class="search-input" v-model="inputCategory" placeholder="Category" />
    <el-select v-model="selectedCountry" placeholder="Country">
      <el-option label="Not Specified" value="" />
      <el-option label="Japan" value="0" />
      <el-option label="France" value="1" />
    </el-select>
    <button class="search-button" @click="search">Search</button>

    <router-link to="/post">
      <el-button class="post-button" type="danger" plain>Post</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
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
.navigation-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 13px 25px 10px;
  margin: 0 0 15px 0;
  border-bottom: thin solid #ededed;
  box-shadow: 0px 0px 10px 0px #f1f1f1;
}

.home-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  color: black;
}

.search-input {
  height: 40px;
}

.search-button {
  background-color: #ffa500;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ff8c00;
}

.search-button:focus {
  background-color: #e07b00;
  outline: none;
  box-shadow: 0 0 0 2px rgba(224, 123, 0, 0.5);
}

.search-button,
.post-button {
  transition: 0.3s;
  height: 40px;
}
</style>
