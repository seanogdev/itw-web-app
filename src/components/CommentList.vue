<template>
  <div v-if="comments.length" class="comment-list">
    <CommentCard v-for="comment in comments" :key="comment.commentId" :comment="comment" />
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  components: {
    // imported here because of the recursive issue in Vue
    // see: https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components
    CommentCard: () => import('@/components/CommentCard.vue'),
  },
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.comment-list {
  .comment-list {
    margin-left: $spacing-4;
  }
}
</style>
