<template>
  <div class="posts">
    <ApolloQuery
      :variables="{ searchString }"
      :query="query"
      :tag="null"
    >
      <!-- The result will automatically updated -->
      <template #default="{ result: { data, loading, error } }">
        <!-- Some content -->
        <div v-if="loading">
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
            :key="edge.post.postId"
            :post="edge.post"
          />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { GET_POSTS_QUERY } from '@/queries/posts';
import PostCard from '@/components/PostCard.vue';

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      searchString: '',
      query: GET_POSTS_QUERY,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 24px;
  max-width: 1128px;
  margin: 0 auto;
}
</style>
