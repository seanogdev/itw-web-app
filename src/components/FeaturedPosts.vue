<template>
  <div v-if="posts" class="featured-posts">
    <CollectionHeader>Latest Company News</CollectionHeader>
    <div class="featured-posts-content">
      <PostCard :post="posts.edges[0].node" variant="large" :trunncation-amount="50" />
      <div v-if="otherPosts.length" class="other-posts">
        <CollectionHeader tag="h3">Other Company News</CollectionHeader>
        <ol>
          <router-link
            v-for="post in otherPosts"
            :key="post.node.postId"
            v-slot="{ href, route, navigate }"
            :to="generatePostUrl(post)"
          >
            <li>
              <!-- eslint-disable vue/no-v-html -->
              <a :href="href" @click="navigate">
                {{ post.node.title | decode }}
              </a>
              <!-- eslint-enable vue/no-v-html -->
              <time :datetime="post.node.date">
                {{ post.node.date | formatDate }}
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
import { generatePostUrl } from '@/utils/helpers';

const categorySlug = process.env.VUE_APP_FEATURED_CATEGORY_SLUG;

export default {
  components: {
    CollectionHeader,
    PostCard,
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
  methods: {
    generatePostUrl(post) {
      return generatePostUrl(post.node);
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
    margin-bottom: $spacing / 2;
    h3 {
      font-size: 16px;
    }
  }

  li {
    margin-top: $spacing-3;
    display: flex;
    flex-direction: column;

    a {
      color: #494e6a;
      font-size: 17px;
      font-weight: 500;
      padding-bottom: $spacing;
    }

    &:hover a,
    a:focus {
      color: $app-primary;
    }
  }

  time {
    font-size: 13px;
    color: rgba(#494e6a, 40%);
  }
}
</style>
