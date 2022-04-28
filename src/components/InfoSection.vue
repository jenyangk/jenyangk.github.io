<template>
  <article>
    <header>
      <h3>{{ caption }}</h3>
      <h4>{{ subcaption }}</h4>
    </header>
    <div>
      <p>{{ info }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "InfoSectionComponent",
  props: {
    caption: String,
    subcaption: String,
    info: String,
  },
};
</script>

<style scoped>
p {
  text-align: justify;
}
</style>