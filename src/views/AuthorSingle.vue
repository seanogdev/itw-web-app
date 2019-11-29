<template>
  <div class="home">
    <PostList
      :query="$options.query"
      :query-variables="{ id: parseInt($route.params.id, 10) }"
    />
  </div>
</template>

<script>

// @ is an alias to /src
import PostList from '@/components/PostList.vue';
import getPostsByAuthorId from '@/queries/getPostsByAuthorId';


export default {
  components: {
    PostList,
  },
  query: getPostsByAuthorId,
};
</script>
