<template>
  <div class="category">
    <PostList
      :empty-title="`No posts found in ${category.name}`"
      :query="$options.query"
      :query-variables="{ slug: $route.params.slug }"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from '@/components/PostList.vue';
import getPostsByCategorySlug from '@/apollo/queries/getPostsByCategorySlug';
import getCategory from '@/apollo/queries/getCategory';

export default {
  components: {
    PostList,
  },
  query: getPostsByCategorySlug,
  apollo: {
    categories: {
      query: getCategory,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
    },
  },
  computed: {
    category() {
      return this.categories && this.categories.edges.length ? this.categories.edges[0].node : null;
    },
  },
  metaInfo() {
    return {
      title: this.category ? this.category.name : '',
    };
  },
};
</script>
