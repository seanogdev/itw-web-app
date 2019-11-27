<template>
  <div class="posts">
    <input
      v-model="searchString"
      type="text"
    >
    <ApolloQuery
      :variables="{ searchString }"
      :query="gql => gql`
      query getPosts ($searchString: String) {
        posts ( where: { search: $searchString } ) {
          edges {
            node {
              link
              postId
              title
            }
          }
        }
      }
    `"
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
          v-else
          class="posts"
        >
          <PostCard
            v-for="post in data.posts.edges"
            :key="post.node.postId"
            :post="post.node"
          />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue';

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      searchString: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
