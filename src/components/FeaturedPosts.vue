<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="posts" class="featured-posts">
    <CollectionHeader>Latest Company News</CollectionHeader>
    <div class="featured-posts-content">
      <PostCard :post="posts.edges[0].node" variant="large" :trunncation-amount="50" />
      <div v-if="otherPosts.length" class="other-posts">
        <CollectionHeader tag="h3">Other Company News</CollectionHeader>
        <ol>
          <router-link
            v-for="{ node: post } in otherPosts"
            :key="post.postId"
            v-slot="{ href, navigate }"
            :to="post.internalLink"
          >
            <li>
              <a :href="href" @click="navigate">
                {{ post.title | decode }}
              </a>
              <time :datetime="post.date">
                {{ post.date | formatDate }}
              </time>
            </li>
          </router-link>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionHeader from '@/components/CollectionHeader.vue';
import PostCard from '@/components/PostCard.vue';
import getPosts from '@/apollo/queries/getPosts';
import getPostsByCategorySlug from '@/apollo/queries/getPostsByCategorySlug';

const categorySlug = process.env.VUE_APP_FEATURED_CATEGORY_SLUG;

export default {
  components: {
    CollectionHeader,
    PostCard,
  },
  computed: {
    otherPosts() {
      if (!this.posts) {
        return [];
      }
      const otherPosts = [...this.posts.edges];
      otherPosts.shift();
      return otherPosts;
    },
  },
  apollo: {
    posts: {
      query: categorySlug ? getPostsByCategorySlug : getPosts,
      variables: {
        first: 7,
        slug: categorySlug,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.featured-posts {
  margin-bottom: $spacing-4;
}

.featured-posts-content {
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr minmax(0px, $spacing * 47);
    grid-gap: $spacing * 3;
  }
}

.other-posts {
  display: none;
  @media (min-width: 800px) {
    display: block;
  }

  &::v-deep > .collection-header {
    margin-bottom: $spacing-2;

    h3 {
      padding-bottom: $spacing-2;
      font-size: 16px;
    }
  }

  li {
    margin-bottom: $spacing-3;
    display: flex;
    flex-direction: column;

    a {
      color: #494e6a;
      font-size: 16px;
      padding-bottom: 12px;
      transition: all 0.2s ease-in-out;
    }

    &:hover a,
    a:focus {
      color: $app-primary;
    }
  }

  time {
    font-size: 12px;
    color: $text-tertiary;
  }
}
</style>
