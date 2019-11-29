<template>
  <div class="posts">
    <div
      v-if="posts"
      class="post-list"
    >
      <PostCard
        v-for="edge in posts.edges"
        :key="edge.node.postId"
        :post="edge.node"
      />
    </div>
    <intersect
      v-if="posts && hasMore"
      root-margin="0px 0px 500px 0px"
      @enter="loadMore"
    >
      <button
        class="post-list-button"
        type="button"
        @click="loadMore"
      >
        Load more
      </button>
    </intersect>
  </div>
</template>

<script>
import { Intersect } from 'vue-observable';
import PostCard from '@/components/PostCard.vue';

export default {
  pageSize: 12,
  components: {
    PostCard,
    Intersect,
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
          searchString: this.searchString,
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
      searchString: '',
    };
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
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    grid-gap: $spacing * 3;
    margin-bottom: $spacing-6;
}

.post-list-button {
    height: 40px;
    background: transparent;
    padding: 0 $spacing-3;
    border-radius: 4px;
    font-size: 16px;
    margin: 0 auto;
    display: block;
    border: 1px solid #e9ecf2;
    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: #c5cada;
    }
}

</style>
