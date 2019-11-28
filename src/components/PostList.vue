<template>
  <div class="posts">
    <ApolloQuery
      :variables="{ first: $options.pageSize, ...queryVariables}"
      :query="query"
      :tag="null"
    >
      <!-- The result will automatically updated -->
      <template #default="{ result: { data, loading, error }, isLoading, query: apolloQuery }">
        <!-- Some content -->
        <div v-if="isLoading">
          Loading...
        </div>
        <div v-else-if="error">
          {{ error }}
        </div>
        <div
          v-else-if="data"
          class="post-list"
        >
          <PostCard
            v-for="edge in data.posts.edges"
            :key="edge.node.postId"
            :post="edge.node"
          />
          <intersect @enter="loadMore(apolloQuery, data.posts.pageInfo.endCursor, isLoading)">
            <button
              @click="loadMore(apolloQuery, data.posts.pageInfo.endCursor, isLoading)"
            >
              Load more
            </button>
          </intersect>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { Intersect } from 'vue-observable';
import PostCard from '@/components/PostCard.vue';

export default {
  components: {
    PostCard,
    Intersect,
  },
  props: {
    query: {
      type: Function,
      required: true,
    },
    queryVariables: {
      type: Object,
      default: () => ({}),
    },
  },
  pageSize: 12,
  data() {
    return {
      cursor: '',
      hasMore: true,
      searchString: '',
    };
  },
  methods: {
    async loadMore(query, after, loading) {
      if (loading) {
        return;
      }
      await query.fetchMore({
        variables: {
          after,
        },
        updateQuery: (prev, result) => {
          if (prev.posts.pageInfo.endCursor === result.fetchMoreResult.posts.pageInfo.endCursor) {
            return prev;
          }
          if (
            !result.fetchMoreResult || !result.fetchMoreResult.posts.pageInfo.hasNextPage) {
            this.hasMore = false;
            return prev;
          }

          return {
            ...prev,
            posts: {
              ...prev.posts,
              edges: [
                ...prev.posts.edges,
                ...result.fetchMoreResult.posts.edges,
              ],
            },
          };
        },
      });
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
}

</style>
