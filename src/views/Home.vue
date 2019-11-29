<template>
  <div class="home">
    <!-- Featured -->

    <!-- Dept Specific -->

    <!-- Paginated -->
    <PostList
      :query="$options.query"
      :query-variables="{
        searchString: this.$store.state.searchInput,
      }"
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
  metaInfo() {
    return {
      title: this.$store.state.searchInput ? `"${this.$store.state.searchInput}"` : null,
    };
  },
};
</script>
