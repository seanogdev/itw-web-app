<template>
  <div class="home">
    <!-- Featured -->

    <!-- Dept Specific -->

    <!-- Paginated -->
    <PostList
      :query="$options.query"
      :query-variables="queryVariables"
    />
  </div>
</template>

<script>

// @ is an alias to /src
import getPosts from '@/queries/getPosts';
import PostList from '@/components/PostList.vue';

export default {
  name: 'Home',
  components: {
    PostList,
  },
  query: getPosts,
  data() {
    return {
      queryVariables: {},
    };
  },
};
</script>
