<template>
  <div class="app-header">
    <div class="app-header__content">
      <div class="app-header__section app-header__section--left">
        <router-link to="/" class="app-header__logo">
          <Logo />
        </router-link>
        <AppHeaderDropdown button-title="Categories">
          <ul v-if="categories">
            <li v-for="{ node: category } in categories.edges" :key="category.slug">
              <router-link :to="category.internalLink" @click.native="resetActiveHeaderTab">
                {{ category.name | decode }}
              </router-link>
            </li>
          </ul>
        </AppHeaderDropdown>
        <AppHeaderDropdown button-title="Authors">
          <ul v-if="users">
            <li v-for="{ node: user } in users.edges" :key="user.slug">
              <router-link :to="user.internalLink" @click.native="resetActiveHeaderTab">
                {{ user.name }}
              </router-link>
            </li>
          </ul>
        </AppHeaderDropdown>
      </div>
      <div class="app-header__section app-header__section--right">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search..."
          class="app-header-search"
          @keydown.enter="navigateToHome"
        />
        <AppButton
          v-if="adminUrl"
          class="app-button--header"
          tag="a"
          target="_blank"
          :href="adminUrl"
        >
          Write a Post
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeaderDropdown from '@/components/AppHeaderDropdown.vue';
// eslint-disable-next-line import/extensions
import Logo from '@/assets/logo.svg?inline';
import getCategories from '@/apollo/queries/getCategories';
import getUsers from '@/apollo/queries/getUsers';

export default {
  components: {
    AppHeaderDropdown,
    Logo,
  },
  apollo: {
    categories: {
      query: getCategories,
    },
    users: {
      query: getUsers,
    },
  },
  computed: {
    ...mapState({ searchInputFromState: 'searchInput' }),
    adminUrl() {
      if (!process.env.VUE_APP_WORDPRESS_URL) {
        return null;
      }
      return `${process.env.VUE_APP_WORDPRESS_URL}/wp-admin/post-new.php`;
    },
    searchInput: {
      get() {
        return this.$store.state.searchInputFromState;
      },
      set(value) {
        this.updateSearchInput(value);
      },
    },
  },
  methods: {
    ...mapActions(['updateSearchInput', 'resetActiveHeaderTab']),
    navigateToHome() {
      this.$router.push('/').catch((e) => e);
    },
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
  z-index: 1;

  .app-header-dropdown,
  .app-button.app-button--header {
    display: none;
  }

  @media (min-width: 800px) {
    height: $header-height;

    .app-header-dropdown {
      display: block;
    }

    .app-button.app-button--header {
      display: flex;
    }
  }
  svg {
    fill: transparent;
  }
}

.app-header__logo {
  margin-right: $spacing * 6;
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
  font-family: $font-family;
  &:focus {
    outline: none;
    border-color: rgba(#403e7f, 0.5);
  }
}

.app-button.app-button--header {
  margin-left: $spacing-4;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
