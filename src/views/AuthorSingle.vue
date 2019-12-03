<template>
  <div class="author">
    <PostList
      :empty-title="`No posts found for ${author.fullName}`"
      :query="$options.query"
      :query-variables="{ userId: $route.params.userId }"
    />
  </div>
</template>

<script>
import getPostsByUserId from '@/apollo/queries/getPostsByUserId';
import getUserByUserId from '@/apollo/queries/getUserByUserId';
// @ is an alias to /src
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList,
  },
  query: getPostsByUserId,
  apollo: {
    users: {
      query: getUserByUserId,
      variables() {
        return {
          userId: this.$route.params.userId,
        };
      },
    },
  },
  computed: {
    author() {
      return this.users ? this.users.edges[0].node : null;
    },
  },
  metaInfo() {
    return {
      title: this.author ? `Posts by ${this.author.fullName}` : '',
    };
  },
};
</script>
