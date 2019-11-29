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
    titleTemplate: (titleChunk) => {
      const appName = process.env.VUE_APP_NAME;
      if (titleChunk) {
        return `${titleChunk} -${appName}`;
      }
      return appName;
    },
  },
  components: {
    AppHeader,
  },

}; </script>

<style lang="scss">
@import '@/styles/reset';

body {
    background: #f5f5f5;
    color: $text-primary;
}

a {
    text-decoration: none;
    color: $app-primary;

    &:hover,
    &:focus,
    &:active {
        color: $app-primary;
    }
}

#app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-top: $header-height--small;
    position: relative;

    @media (min-width: 800px) {
        padding-top: $header-height;
    }
}

.app-content {
    max-width: $app-width;
    margin: 0 auto;
    padding: $spacing * 4 $spacing-2;

    @media (min-width: 800px) {
        padding: $spacing * 6 $spacing-2;
    }
}

</style>
