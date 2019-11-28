<template>
  <div class="app-header">
    <div class="app-header__content">
      <div class="app-header__section app-header__section--left">
        <router-link
          to="/"
          class="app-header__logo"
        >
          <Logo />
        </router-link>
        <AppHeaderDropdown button-title="Categories" />
        <AppHeaderDropdown button-title="Authors" />
      </div>
      <div class="app-header__section app-header__section--right">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search..."
          class="app-header-search"
        >
        <a
          class="app-header-write-link"
          href="https://intheworks.teamwork.com/wp/wp-admin"
        >Write a Post</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderDropdown from '@/components/AppHeaderDropdown.vue';
// eslint-disable-next-line import/extensions
import Logo from '@/assets/logo.svg?inline';

export default {
  components: {
    AppHeaderDropdown,
    Logo,
  },
  data() {
    return {
      searchInput: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.app-header {
    background: #fff;
    height: $header-height--small;
    box-shadow: 0 4px 4px rgba(#4b6070, 0.1);
    position: relative;
    position: fixed;
    top: 0;
    width: 100%;

    .app-header-dropdown,
    .app-header-write-link {
        display: none;
    }

    @media (min-width: 800px) {
        height: $header-height;

        .app-header-dropdown {
            display: block;
        }

        .app-header-write-link {
            display: flex;
        }
    }
    svg {
        fill: transparent;
    }
}

.app-header__logo {
    margin-right: $spacing * 2;
}

.app-header__content {
    max-width: $app-width;
    padding: 0 $spacing-2;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
}

.app-header__section {
    display: flex;
    align-items: center;
}

.app-header__section--right {
    margin-left: auto;
}

.app-header-search {
    border: 1px solid rgba(#403e7f, 0.2);
    border-radius: 20px;
    padding: 0 $spacing-2;
    height: 40px;
    font-size: 15px;
    background: transparent;
    font-family: 'Fakt Soft';
    &:focus {
        outline: none;
        border-color: rgba(#403e7f, 0.5);
    }

    &::placeholder {
        margin-top: 8px;
        line-height: normal;
    }
}
.app-header-write-link {
    margin-left: $spacing-4;
    height: 40px;
    background: $app-primary;
    color: #fff;
    border-radius: 4px;
    padding: 0 $spacing-2;
    font-weight: 500;
    display: flex;
    align-items: center;
    font-size: 14px;
}

</style>
