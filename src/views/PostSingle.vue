<template>
  <ApolloQuery
    :variables="{ slug: $route.params.slug }"
    :query="query"
    class="post-single"
  >
    <!-- The result will automatically updated -->
    <template v-slot="{ result: { data, loading } }">
      <!-- Some content -->
      <div v-if="loading">
        Loading...
      </div>
      <template v-else-if="data">
        <post-image
          :image="data.post.featuredImage"
          :height="400"
        />
        <PostMeta :post="data.post" />
        <h1>{{ data.post.title }}</h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="data.post.content" />
      </template>
    </template>
  </ApolloQuery>
</template>

<script>
import PostImage from '@/components/PostImage.vue';
import PostMeta from '@/components/PostMeta.vue';
import { GET_POST_BY_SLUG } from '@/queries/posts';

export default {
  components: {
    PostImage,
    PostMeta,
  },
  data() {
    return {
      query: GET_POST_BY_SLUG,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
    font-size: 29px;
    margin-bottom: $spacing-2;
}

</style>
