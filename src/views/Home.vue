<template>
  <div class="home">
    <!-- Featured -->

    <!-- Dept Specific -->

    <!-- Paginated -->
    <PostList
      :query="query"
      :query-variables="queryVariables"
    />
  </div>
</template>

<script>

// @ is an alias to /src
import PostList from '@/components/PostList.vue';
import { GET_POSTS_QUERY } from '../queries/posts';

export default {
  name: 'Home',
  components: {
    PostList,
  },
  data() {
    return {
      query: GET_POSTS_QUERY,
      queryVariables: {},
    };
  },
};
</script>
