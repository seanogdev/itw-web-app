<template>
  <div
    v-if="posts"
    class="featured-posts"
  >
    <CollectionHeader>Latest Company News</CollectionHeader>
    <div class="featured-posts-content">
      <PostCard
        :post="posts.edges[0].node"
        variant="large"
        :trunncation-amount="50"
      />
      <div
        v-if="otherPosts.length"
        class="other-posts"
      >
        <CollectionHeader>Other Company News</CollectionHeader>
        <ol>
          <router-link
            v-for="post in otherPosts"
            :key="post.node.postId"
            v-slot="{ href, route, navigate }"
            :to="generatePostUrl(post)"
          >
            <li>
              <!-- eslint-disable vue/no-v-html -->
              <a
                :href="href"
                @click="navigate"
                v-html="post.node.title"
              />
              <!-- eslint-enable vue/no-v-html -->
              <time
                :datetime="post.node.date"
              >
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
import getPosts from '@/queries/getPosts';
import getPostsByCategorySlug from '@/queries/getPostsByCategorySlug';
import { isProduction, generatePostUrl } from '@/utils/helpers';


export default {
  components: {
    CollectionHeader,
    PostCard,
  },
  apollo: {
    posts: {
      query: isProduction ? getPosts : getPostsByCategorySlug,
      variables: {
        first: 7,
        slug: isProduction ? null : 'company-news-general',
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
    margin-bottom: $spacing * 4;

    & > .collection-header {
        margin-bottom: $spacing * 4;
    }
}

.featured-posts-content {
    display: grid;
    grid-template-columns: 1fr $spacing * 47;
    grid-gap: $spacing * 3;
}

.other-posts {
    & > .collection-header {
        font-size: 14px;
    }

    li {
        margin-top: $spacing-3;
        display: flex;
        flex-direction: column;
        a {
            font-size: 17px;
            font-weight: 500;
            padding-bottom: $spacing;
        }
    }

    time {
        font-size: 13px;
    }
}

</style>
