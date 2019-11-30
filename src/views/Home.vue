<template>
  <div class="home">
    <!-- Featured -->
    <FeaturedPosts v-show="!this.$store.state.searchInput" />
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
import FeaturedPosts from '@/components/FeaturedPosts.vue';
import PostList from '@/components/PostList.vue';

export default {
  name: 'Home',
  components: {
    FeaturedPosts,
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
