<template>
  <div class="projects">
    <img src="../assets/tree.png" alt="Nested Tree Diagram">
    <InfoSectionComponent caption="Hierarchy Tree Visualization" subcaption=""
      :infos="['This project is a simple demonstration of my Angular implementation of Mike Bostock\'s Collapsible Tree (https://observablehq.com/@d3/collapsible-tree?collection=@d3/d3-hierarchy).',
      'Since there weren\'t many examples to demonstrate the use of D3 in Angular, this is one of many ways to implement D3 onto Angular. I also added additional features that gives the visualization more flexibility. From the visual, you can dynamically change the structure of the hierarchy to get the structure that you want.',
      'The one downside to my approach is that, since I\'m merely updating the state of nodes and links, I\'m not able to show animations when collapsing or expanding a node.']" />
    <a href="https://jenyangk.github.io/D3-Hierarchy-Tree/" title="Demo Site">🌐</a>
    <a href="https://github.com/jenyangk/D3-Hierarchy-Tree" title="Repository"><i
        class="devicon-github-original"></i></a>
    <SVGLineComponent></SVGLineComponent>
    <img src="../assets/seoer.png" alt="SE-OER Sign In Page">
    <InfoSectionComponent caption="SE-OER" subcaption="Software Engineering Open Education Resources"
      :infos="['Software Engineering Open Education Resources (SEOER) is a web application that allows collaborative practice of topics in software engineering.']" />
    <a href="https://ualberta-cmput401.github.io/SE-OER/" title="Documentation">📄</a>
    <SVGLineComponent></SVGLineComponent>
    <img src="../assets/feels_log.png" alt="Feels Log Logo">
    <InfoSectionComponent caption="Feels Log" subcaption=""
      :infos="['A social media android application that allows the user to post, edit, and see their own mood events and also lets them follow other users to see their most recent mood events.']" />
    <a href="https://github.com/CMPUT301F19T19/legendary-fiesta/wiki" title="Documentation">📄</a>
    <a href="https://github.com/CMPUT301F19T19/legendary-fiesta" title="Repository"><i
        class="devicon-github-original"></i></a>
  </div>
</template>

<script>
import SVGLineComponent from "../components/SVGLine.vue";
import InfoSectionComponent from "../components/InfoSection.vue";

export default {
  name: "ProjectView",
  components: {
    SVGLineComponent,
    InfoSectionComponent
  },
};
</script>

<style scoped>
img {
  height: 300px;
  border-radius: 20px;
}

i {
  font-size: 30px;
}

a {
  padding: 10px;
  font-size: 30px;
  text-decoration: none;
}
</style>