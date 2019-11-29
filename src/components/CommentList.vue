<template>
  <div
    v-if="comments"
    class="comments-list"
  >
    <div
      v-for="comment in comments.nodes"
      :key="comment.id"
      class="comment"
    >
      <div class="comment-content">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="comment-body"
          v-html="comment.content"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
      <CommentList
        v-if="comment.replies"
        :comments="comment.replies"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
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
.comment {
    padding: $spacing-2 0;

    //sass-lint:disable-block no-combinators
    &::v-deep .comments-list {
        margin-left: $spacing-4;
    }
}

.comment-content {
    padding: $spacing-4 $spacing-4 $spacing-2;
    background: #fff;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #e9ecf2;
    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: #c5cada;
    }
}

.comment-body {
    font-size: 17px;
    line-height: 1.6;

    &::v-deep {
        p,
        ul,
        ol {
            margin-bottom: $spacing-2;
        }

        br {
            line-height: 1.8;
        }

        h1,
        h2,
        h3,
        h4 {
            margin-top: $spacing;
            font-weight: 500;
        }

        h1 {
            font-size: 24px;
        }
        h2 {
            font-size: 20px;
        }
        h3 {
            font-size: 18px;
        }
    }
}

</style>
