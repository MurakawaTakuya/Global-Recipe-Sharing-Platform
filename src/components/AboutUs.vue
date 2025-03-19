<template>
  <h1 class="about-title">About Us</h1>
  <div class="about-list">
    <div class="about-card">
      <h1>Takuya Murakawa</h1>
      <p>Nagoya Institute of Technology</p>
      <p>Full Stack Web Developer with 6 years of experience</p>
      <p>Computer Science, Video Image Processing, Vision Transformer</p>
      <p>Role: Management, Design, Backend(API, Database, Storage, Authentication)</p>
      <p><a href="https://github.com/MurakawaTakuya">GitHub Profile</a></p>
    </div>

    <div class="about-card">
      <h1>Wakaba Nishi</h1>
      <p>Nagoya Institute of Technology</p>
      <p>Computer Science, Data Analysis using ABM</p>
      <p>
        Role: Planning the site requirements and direction, Creating the materials and recipe
        display feature, Developing the search feature, Implementing the saved list display feature
      </p>
    </div>

    <div class="about-card">
      <h1>Hideki Asano</h1>
      <p>Nagoya Institute of Technology</p>
      <p>Computer Science, Speech Synthesis</p>
      <p>
        Role: Build the main page. Implement the form feature. Provide some sample recipes. Build
        the footer and the about-us page.
      </p>
    </div>
  </div>

  <h1 class="about-title">Features</h1>
  <div class="about-list">
    <div class="about-card">
      <h1>Search Feature</h1>
      <p>You can search by name, category, and country.</p>
    </div>

    <div class="about-card">
      <h1>Authentication</h1>
      <p>You can sign in using your Google Account.</p>
    </div>

    <div class="about-card">
      <h1>Create Post</h1>
      <p>
        Users can create new posts to share their thoughts and ideas. You need to sign in to create
        a post.
      </p>
    </div>

    <div class="about-card">
      <h1>Rating System</h1>
      <p>Users can rate posts to provide feedback and help others find quality content.</p>
    </div>

    <div class="about-card">
      <h1>Save Feature</h1>
      <p>You can save your favorite posts for easy access later.</p>
    </div>

    <div class="about-card">
      <h1>Deployment</h1>
      <p>Hosting: <a target="_blank" href="https://vercel.com/">Vercel</a></p>
      <p>Database, Authentication: <a target="_blank" href="https://supabase.com/">Supabase</a></p>
    </div>
  </div>
</template>

<script></script>

<style>
.about-title {
  text-align: center;
  margin-bottom: 10px;
}

.about-list {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 30px;
}

.about-card {
  width: 32%;
  min-width: 300px;
  border: thin solid #ebebeb;
  border-radius: 15px;
  padding: 15px 23px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  text-decoration: none;
  color: black;
  position: relative;
}

.about-card p {
  margin: 5px 0;
}

@media (max-width: 600px) {
  .about-card {
    width: 98%;
  }
}
</style>
