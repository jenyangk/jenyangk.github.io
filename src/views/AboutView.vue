<template>
  <div class="about" style="width: 100%">
    <h1>Hello!</h1>
    <img id="profile-pic" src="../assets/profile.png" alt="Me" />
    <p>
      Greetings! I'm a full-stack software developer with a burning passion for learning new technologies and creating innovative software solutions. My expertise in both frontend and backend development has made me a well-rounded developer capable of handling projects of all sizes. With my self-taught background and over a year of experience, I have developed a strong skill set in full-stack development, process automation, database design and management, and modern frontend technologies such as Angular.
    </p>
    <p>
      I bring a unique blend of technical knowledge and collaboration to the table, making me an asset to any team. I'm always eager to work with others and bring my positive energy and problem-solving skills to the table. When I'm not coding, you can find me exploring the great outdoors on a hiking trail or traveling to new destinations to expand my horizons and gather new experiences. For me, travel is an integral part of both my personal and professional growth, allowing me to broaden my perspective and continue to grow as a developer.
    </p>
    <h2>Stats:</h2>
    <h3>Languages:</h3>
    <div class="icon-list">
      <i class="devicon-typescript-plain" title="Typescript"></i>
      <i class="devicon-javascript-plain" title="Javascript"></i>
      <i class="devicon-solidity-plain" title="Solidity"></i>
      <i class="devicon-csharp-plain" title="C#"></i>
      <i class="devicon-python-plain" title="Python"></i>
      <i class="devicon-sass-original" title="Sass"></i>
    </div>
    <h3>Frameworks/Libraries:</h3>
    <div class="icon-list">
      <i class="devicon-postgresql-plain" title="PostgreSQL"></i>
      <i class="devicon-angularjs-plain" title="Angular"></i>
      <i class="devicon-vuejs-plain" title="Vue JS"></i>
      <i class="devicon-d3js-plain" title="D3"></i>
      <img
        id="image-logo"
        src="../assets/fabric_logo.png"
        alt="Hyperledger Fabric"
        title="Hyperledger Fabric"
      />
    </div>
    <h3>Platforms:</h3>
    <div class="icon-list">
      <i class="devicon-azure-plain" title="Azure"></i>
    </div>
    <h2>Current Interests:</h2>
    <h4>Web3, Smart Contracts, Enterprise Blockchains</h4>
  </div>
</template>

<style scoped>
i {
  font-size: 32px;
  padding: 10px;
}

p {
  text-align: justify;
}

#profile-pic {
  width: 100%;
  max-width: 300px;
  border-radius: 50%;
}

#image-logo {
  height: 32px;
  padding: 10px;
}

.icon-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
