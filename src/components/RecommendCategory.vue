<template>
  <h1>Recommended Category</h1>
  <div class="recommend-category">
    <div>
      <router-link
        class="recommend-link"
        :to="{ path: 'search', query: { category: 'traditional' } }"
      >
        <p>Traditional</p>
        <img src="/traditional.webp" alt="Traditional Dish" />
      </router-link>
    </div>
    <div>
      <router-link class="recommend-link" :to="{ path: 'search', query: { category: 'meat' } }">
        <p>Meat</p>
        <img src="/meat.webp" alt="Meat Dish" />
      </router-link>
    </div>
    <div>
      <router-link class="recommend-link" :to="{ path: 'search', query: { category: 'chicken' } }">
        <p>Chicken</p>
        <img src="/chicken.webp" alt="Chicken Dish" />
      </router-link>
    </div>
    <div>
      <router-link class="recommend-link" :to="{ path: 'search', query: { category: 'sweets' } }">
        <p>Sweets</p>
        <img src="/sweets.webp" alt="Sweets Dish" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendCategory',
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 10px;
}

.recommend-category {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.recommend-link {
  text-decoration: none;
  color: white;
  position: relative;
}

.recommend-category > div {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: 0.3s;
}

.recommend-category > div:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
}

.recommend-category img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.recommend-category p {
  text-align: center;
  position: absolute;
  bottom: 13px;
  left: 13px;
  z-index: 10;
  text-shadow: 0px 0px 5px #000000cf;
  font-weight: 600;
}
</style>
