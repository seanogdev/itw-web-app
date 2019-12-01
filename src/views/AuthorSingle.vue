<template>
  <div class="author">
    <PostList :query="$options.query" :query-variables="{ nicename }" />
  </div>
</template>

<script>
import getPostsByAuthorNiceName from '@/apollo/queries/getPostsByAuthorNiceName';
import getUserByNiceName from '@/apollo/queries/getUserByNiceName';
// @ is an alias to /src
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList,
  },
  query: getPostsByAuthorNiceName,
  apollo: {
    users: {
      query: getUserByNiceName,
      variables() {
        return {
          nicename: this.nicename,
        };
      },
      skip() {
        return !this.nicename;
      },
    },
  },
  computed: {
    author() {
      return this.users ? this.users.edges[0].node : null;
    },
    nicename() {
      return this.$route.params.nicename;
    },
  },
  metaInfo() {
    return {
      title: this.author ? `Posts by ${this.author.fullName}` : '',
    };
  },
};
</script>
