<script setup>
import { AnOutlinedHome } from '@kalimahapps/vue-icons';
import { createClient } from '@supabase/supabase-js';
import { onMounted, ref } from 'vue';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
const user = ref(null);

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: import.meta.env.VITE_REDIRECT_URL,
    },
  });
  if (error) {
    console.error('Error logging in:', error);
  } else {
    console.log('Google login initiated:', data);
    user.value = data.user;
  }
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error logging out:', error);
  } else {
    user.value = null;
  }
};

onMounted(async () => {
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  user.value = currentUser;
});
</script>

<template>
  <div class="navigation-bar">
    <div class="home-buttom-and-search-bar">
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
    </div>
    <button class="search-button" @click="search">Search</button>

    <router-link to="/post">
      <el-popover
        v-if="!user"
        placement="top-start"
        :width="200"
        trigger="hover"
        content="You need to be logged in to create a post."
      >
        <template #reference>
          <el-button class="el-button" type="primary" plain :disabled="!user"
            >Create Post</el-button
          >
        </template>
      </el-popover>
      <el-button v-else class="el-button" type="primary" plain>Create Post</el-button>
    </router-link>

    <div v-if="user" class="auth-buttons">
      <el-button class="el-button" type="danger" plain @click="handleLogout">Sign out</el-button>
    </div>
    <div v-else class="auth-buttons">
      <el-button class="el-button" type="success" plain @click="handleLogin">Sign in</el-button>
    </div>
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
.el-button {
  transition: 0.3s;
  height: 40px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.home-buttom-and-search-bar {
  display: flex;
  gap: 5px;
  align-items: center;
  width: 100%;
}

@media (max-width: 600px) {
  .home-icon {
    margin: 5px;
  }

  .navigation-bar {
    flex-wrap: wrap;
    padding: 10px 10px 8px;
    gap: 5px 10px;
  }
}
</style>
