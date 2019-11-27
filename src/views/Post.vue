<template>
  <ApolloQuery
    :variables="{ slug: $route.params.slug }"
    :query="gql => gql`
      query getPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          link
          postId
          content
          title
        }
      }
    `"
  >
    <!-- The result will automatically updated -->
    <template #default="{ result: { data, loading } }">
      <!-- Some content -->
      <div v-if="loading">
        Loading...
      </div>
      <PostCard
        v-else-if="data"
        :post="data.postBy"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="data.postBy.content" />
    </template>
  </ApolloQuery>
</template>

<script>
import PostCard from '@/components/PostCard.vue';

export default {
  components: {
    PostCard,
  },
};
</script>

<style lang="scss" scoped>

</style>
