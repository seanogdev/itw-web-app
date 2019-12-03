<template>
  <div class="app-header">
    <div class="app-header__content">
      <div class="app-header__section app-header__section--left">
        <router-link to="/" class="app-header__logo">
          <Logo />
        </router-link>
        <AppHeaderSection
          button-title="Categories"
          :query="$options.CategoriesQuery"
          query-key="categories"
        >
          <template v-slot="{ node: category }">
            <router-link :to="category.internalLink" @click.native="resetActiveHeaderTab">
              {{ category.name | decode }}
            </router-link>
          </template>
        </AppHeaderSection>
        <AppHeaderSection button-title="Authors" :query="$options.UsersQuery" query-key="users">
          <template v-slot="{ node: user }">
            <router-link :to="user.internalLink" @click.native="resetActiveHeaderTab">
              {{ user.name }}
            </router-link>
          </template>
        </AppHeaderSection>
      </div>
      <div class="app-header__section app-header__section--right">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search..."
          class="app-header-search"
          @keydown.enter="navigateToHome"
        />

        <Dropdown class="app-header-user" placement="bottom-end" show-chevron>
          <template v-if="currentUser" #button>
            <img v-if="currentUser.avatar" :src="currentUser.avatar.url" width="24" height="24" />
            <span class="app-header-user-name">{{ currentUser.fullName }}</span>
          </template>
          <template v-else #button>
            <img src="http://www.gravatar.com/avatar/?d=identicon" width="24" height="24" />
          </template>

          <template #default>
            <DropdownItem v-for="item in headerItems" :key="item.title" v-bind="item.props">
              {{ item.title }}
            </DropdownItem>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeaderSection from '@/components/AppHeaderSection.vue';
// eslint-disable-next-line import/extensions
import Logo from '@/assets/logo.svg?inline';
import getCategories from '@/apollo/queries/getCategories';
import getCurrentUser from '@/apollo/queries/getCurrentUser';
import getUsers from '@/apollo/queries/getUsers';

export default {
  components: {
    AppHeaderSection,
    Logo,
  },
  CategoriesQuery: getCategories,
  UsersQuery: getUsers,
  computed: {
    ...mapState({ searchInputFromState: 'searchInput' }),
    canPublishPosts() {
      return this.currentUser ? this.currentUser.capabilities.includes('publish_posts') : false;
    },
    headerItems() {
      const items = [];
      if (this.currentUser) {
        items.push({
          title: 'Logout',
          props: {
            tag: 'a',
            href: `${this.loginUrl}?action=logout`,
          },
        });
      } else {
        items.push({
          title: 'Login',
          props: {
            tag: 'a',
            href: this.loginUrl,
          },
        });
      }
      if (this.canPublishPosts) {
        items.push({
          title: 'Write Post',
          props: {
            tag: 'a',
            href: this.writePostUrl,
            target: '_blank',
          },
        });
      }
      return items;
    },
    loginUrl() {
      if (!this.wordpressUrl) {
        return null;
      }
      return `${this.wordpressUrl}/wp-login.php`;
    },
    writePostUrl() {
      if (!this.wordpressUrl) {
        return null;
      }
      return `${this.wordpressUrl}/wp-admin/post-new.php`;
    },
    searchInput: {
      get() {
        return this.$store.state.searchInputFromState;
      },
      set(value) {
        this.updateSearchInput(value);
      },
    },
    wordpressUrl() {
      return process.env.VUE_APP_WORDPRESS_URL;
    },
  },
  apollo: {
    currentUser: {
      query: getCurrentUser,
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
  .app-header-user-name {
    display: none;
  }

  @media (min-width: 800px) {
    height: $header-height;

    .app-header-dropdown,
    .app-header-user-name {
      display: block;
    }

    .app-button.app-button--header {
      display: flex;
    }
  }
}

.app-header__logo {
  svg {
    fill: transparent;
    width: auto;
  }
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

.app-header-dropdown {
  &:first-of-type {
    margin-left: $spacing-8;
  }
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

.app-header-user {
  margin-left: $spacing-4;

  ::v-deep .app-button {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 14px;
  }

  img {
    border-radius: 50%;
    overflow: hidden;
    margin-right: $spacing;
  }
}
</style>
