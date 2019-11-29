<template>
  <div class="home">
    <PostList
      :query="$options.query"
      :query-variables="{ slug: $route.params.slug }"
    />
  </div>
</template>

<script>

// @ is an alias to /src
import PostList from '@/components/PostList.vue';
import getPostsByCategorySlug from '@/queries/getPostsByCategorySlug';


export default {
  components: {
    PostList,
  },
  query: getPostsByCategorySlug,
};
</script>
