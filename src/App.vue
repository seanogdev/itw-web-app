<template>
  <div id="app">
    <AppHeader />
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  metaInfo: {
    titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - In The Works` : 'In The Works'),
  },
  components: {
    AppHeader,
  },

}; </script>

<style lang="scss">
@import '@/styles/reset';

body {
  background: #f5f5f5;
}

a {
  text-decoration: none;
  color: #6A84ED;

  &:hover,
  &:focus,
  &:active {
  color: #6A84ED;

  }
}
#app {
  font-family: 'Fakt Soft', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-content {
  max-width: $app-width;
  margin: 0 auto;
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
