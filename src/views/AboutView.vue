<template>
  <div class="about">
    <h1>Hello!</h1>
    <img id="profile-pic" src="../assets/profile.png" alt="Me" />
    <p>
      I'm passionate in learning new technologies and building software of all
      sizes. No technology is too difficult to understand. An avid self-taught
      software developer with experiences in building frontend applications and
      backend services. Proactive IT analyst with 1+ years in infrastructure,
      technical support, and process automation through scripting.
    </p>
    <p>
      Jack-of-all-trades with broad experiences. Love collaborating with people
      at all levels of experience. Aside from building software, I enjoy hiking
      with friends and travelling around the world. As seeing is believing, I
      travel to have newer experiences and witness various cultures and
      backgrounds.
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
  height: 300px;
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
