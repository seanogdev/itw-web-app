<template>
  <div class="posts">
    <Loading v-if="!posts && $apollo.queries.posts.loading" />
    <template v-if="posts && posts.edges.length">
      <div class="post-list">
        <PostCard v-for="edge in posts.edges" :key="edge.node.postId" :post="edge.node" />
      </div>
      <intersect v-if="hasMore" root-margin="0px 0px 500px 0px" @enter="loadMore">
        <div>
          <Loading v-show="$apollo.queries.posts.loading" />
          <button
            v-show="!$apollo.queries.posts.loading"
            class="post-list-button"
            type="button"
            @click="loadMore"
          >
            Load more
          </button>
        </div>
      </intersect>
    </template>
    <EmptyState
      v-if="!$apollo.queries.posts.loading && !posts.edges.length"
      :message="emptyStateMessage"
    />
  </div>
</template>

<script>
import { Intersect } from 'vue-observable';
import EmptyState from '@/components/EmptyState.vue';
import PostCard from '@/components/PostCard.vue';

export default {
  pageSize: 12,
  components: {
    EmptyState,
    Intersect,
    PostCard,
  },
  props: {
    query: {
      type: Object,
      required: true,
    },
    queryVariables: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    posts: {
      variables() {
        return {
          first: this.$options.pageSize,
          ...this.queryVariables,
        };
      },
      query() {
        return this.query;
      },
    },
  },

  data() {
    return {
      cursor: '',
      hasMore: true,
    };
  },

  computed: {
    emptyStateMessage() {
      let message = 'No posts found';
      const searchString = this.$store.state.searchInput;
      if (searchString) {
        message = `${message} with the term "${searchString}"`;
      }
      return message;
    },
  },

  watch: {
    queryVariables() {
      this.hasMore = true;
    },
  },

  methods: {
    async loadMore() {
      if (this.$apollo.queries.posts.loading) {
        return;
      }

      if (!this.posts.pageInfo.endCursor) {
        this.hasMore = false;
        return;
      }
      await this.$apollo.queries.posts.fetchMore({
        variables: {
          after: this.posts.pageInfo.endCursor,
        },
        updateQuery: this.updateQuery,
      });
    },
    updateQuery(previousResult, { fetchMoreResult }) {
      const newEdges = fetchMoreResult.posts.edges;
      const { pageInfo } = fetchMoreResult.posts;

      if (!newEdges.length) {
        this.hasMore = false;
        return previousResult;
      }
      return {
        // Put the new posts at the end of the list and update `pageInfo`
        // so we have the new `endCursor` and `hasNextPage` values
        posts: {
          // eslint-disable-next-line no-underscore-dangle
          __typename: previousResult.posts.__typename,
          edges: [...previousResult.posts.edges, ...newEdges],
          pageInfo,
        },
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-gap: $spacing * 3;
  margin-bottom: $spacing-6;
}

.loader {
  margin-top: calc(100% - #{$spacing/2});
}

.post-list-button {
  height: 40px;
  background: transparent;
  padding: 0 $spacing-3;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 auto;
  display: block;
  border: 1px solid $border;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: $border-hover;
  }
}
</style>
