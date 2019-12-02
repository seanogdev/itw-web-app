<template>
  <div v-if="comments.length" class="comment-list">
    <CommentCard
      v-for="comment in comments"
      :key="comment.id"
      :depth="depth"
      :parent-comment-id="parentCommentId"
      :post-id="postId"
      :comment="comment"
    />
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
    depth: {
      type: Number,
      default: 1,
    },
    comments: {
      type: Array,
      default: null,
    },
    parentCommentId: {
      type: Number,
      default: null,
    },
    postId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.comment-list {
  .comment-list,
  .create-comment {
    margin-left: $spacing-4;
  }
}
</style>
