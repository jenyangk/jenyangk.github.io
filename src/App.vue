<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About Me</router-link> |
    <router-link to="/projects">Projects</router-link> |
    <router-link to="/experience">Experiences</router-link> 
  </nav>
  <div class="view-container">
    <router-view />
  </div>
  <footer-component></footer-component>
</template>

<script>
import FooterComponent from './components/Footer.vue'

export default {
  name: "App",
  components: {
    FooterComponent
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap");

#app {
  font-family: IBM Plex Mono, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.view-container {
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}

body {
  color: white;
  background: rgb(34, 36, 41);
  font-weight: 400;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-track {
    background-color: none;
}

::-webkit-scrollbar-thumb {
    background-color: #44999d;
    border-radius: 60px;
}
</style>
