<template>
  <article>
    <header>
      <h3>{{ caption }}</h3>
      <h4>{{ subcaption }}</h4>
    </header>
    <div>
      <p v-for="info of infos" :key="info">{{ info }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "InfoSectionComponent",
  props: {
    caption: String,
    subcaption: String,
    infos: Array,
  },
};
</script>

<style scoped>
p {
  text-align: justify;
}
</style>