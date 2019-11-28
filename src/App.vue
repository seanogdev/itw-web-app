<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - In The Works` : 'In The Works'),
  },

}; </script>

<style lang="scss">
body {
  background: #f5f5f5;
}
#app {
  font-family: 'Fakt Soft', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
