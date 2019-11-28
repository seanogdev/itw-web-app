<template>
  <div class="home">
    <!-- Featured -->

    <!-- Dept Specific -->

    <!-- Paginated -->
    <PostList
      :query="query"
      :query-variables="{ slug: $route.params.slug}"
    />
  </div>
</template>

<script>

// @ is an alias to /src
import PostList from '@/components/PostList.vue';
import { GET_POSTS_QUERY_CATEGORIES } from '../queries/posts';

export default {
  components: {
    PostList,
  },
  data() {
    return {
      query: GET_POSTS_QUERY_CATEGORIES,
    };
  },
};
</script>
