<template>
  <footer>
    <div class="icon-list">
      <a href="https://www.linkedin.com/in/jenyangkoh/">
        <i class="devicon-linkedin-plain"></i
      ></a>
      <a href="https://github.com/jenyangk"
        ><i class="devicon-github-original"></i
      ></a>
    </div>
    <span class="footer-text">
      &copy; 2022 Jen Yang Koh. Built with
      <i class="devicon-vuejs-plain colored" title="Vue JS" style="font-size: 0.7rem"></i>
    </span>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
a {
  padding: 10px;
  color: white;
  font-size: 32px;
  text-decoration: none;
}

footer {
  margin-top: 60px;
}

i {
  font-size: 1.4rem;
}

.footer-text {
  font-size: 0.7rem;
}
</style>