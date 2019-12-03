<template>
  <div id="app">
    <AppHeader />
    <div class="app-content">
      <router-view />
    </div>
    <div class="app-footer">
      <a href="https://teamwork.com" target="_blank"><TwLogo class="app-teamwork-logo"/></a>
      <nav class="app-footer-nav">
        <a href="https://teamwork.com" target="_blank">Website</a> |
        <a href="https://blog.teamwork.com" target="_blank">Blog</a> |
        <a href="https://engineroom.teamwork.com" target="_blank">Engine Room</a>
      </nav>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
// eslint-disable-next-line import/extensions
import TwLogo from '@/assets/tw-logo.svg?inline';

export default {
  metaInfo: {
    titleTemplate: (titleChunk) => {
      const appName = process.env.VUE_APP_NAME;
      if (titleChunk) {
        return `${titleChunk} - ${appName}`;
      }
      return appName;
    },
  },
  components: {
    TwLogo,
    AppHeader,
  },
};
</script>

<style lang="scss">
@import '@/styles/fonts';
@import '@/styles/reset';

body {
  background: #f5f7fa;
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
  min-height: 100vh;
}

.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  margin-bottom: $spacing-8;
}

.app-teamwork-logo {
  width: auto;
  margin-bottom: $spacing-4;
}

.app-footer-nav {
  font-size: 13px;
}
</style>
