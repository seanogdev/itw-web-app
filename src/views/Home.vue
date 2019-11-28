<template>
  <div class="home">
    <!-- Featured -->

    <!-- Dept Specific -->

    <!-- Paginated -->
    <PostList />
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from '@/components/PostList.vue';

export default {
  name: 'Home',
  components: {
    PostList,
  },
};
</script>
