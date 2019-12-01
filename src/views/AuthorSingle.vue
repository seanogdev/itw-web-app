<template>
  <div class="author">
    <PostList :query="$options.query" :query-variables="{ id }" />
  </div>
</template>

<script>
import { generateAuthorName } from '@/utils/helpers';
import getPostsByAuthorId from '@/apollo/queries/getPostsByAuthorId';
import getUser from '@/apollo/queries/getUser';
// @ is an alias to /src
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList,
  },
  query: getPostsByAuthorId,
  apollo: {
    users: {
      query: getUser,
      variables() {
        return {
          id: this.id,
        };
      },
      skip() {
        return !this.id;
      },
    },
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    author() {
      return this.users ? this.users.edges[0].node : null;
    },
    authorName() {
      if (!this.author) {
        return '';
      }
      return generateAuthorName(this.author);
    },
  },
  metaInfo() {
    return {
      title: this.authorName ? `Posts by ${this.authorName}` : '',
    };
  },
};
</script>
