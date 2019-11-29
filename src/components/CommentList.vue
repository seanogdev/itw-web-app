<template>
  <div class="comments">
    <div
      v-if="comments"
      class="comments-list"
    >
      <div
        v-for="comment in comments.nodes"
        :key="comment.id"
        class="comment"
      >
        <div
          class="comment-content"
          v-html="comment.content"
        />
        <CommentList
          v-if="comment.replies"
          :comments="comment.replies"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommentsList',
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.comment-list {
}

.comment {
  border-bottom: 1px solid black;
  padding: $spacing-4;

  &:last-of-type {
    border-bottom:0;
  }
}

.comment-content {
    font-size: 17px;
    line-height: 1.6;

    &::v-deep {
        p,
        ul,
        ol {
            margin-bottom: $spacing-2;
        }
    }
}

</style>
