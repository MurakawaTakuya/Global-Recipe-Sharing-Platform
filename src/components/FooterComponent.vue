<template>
  <footer>
    <p>Efrei Paris, Web Development 2025 - Group 2</p>
    <router-link to="/about-us">About Us</router-link>
    <a href="https://github.com/MurakawaTakuya/Global-Recipe-Sharing-Platform">GitHub Repository</a>
  </footer>
</template>

<script></script>

<style>
footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
}

@media (max-width: 600px) {
  footer {
    gap: 0;
    flex-direction: column;
    align-items: center;
  }
}
</style>
