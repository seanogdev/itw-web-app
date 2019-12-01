<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="comment">
    <div class="comment-card">
      <div class="comment-card-content">
        <router-link :to="getLinkForAuthor(comment.author)" class="comment-card-name">
          {{ comment.author.name }}
        </router-link>
        <time :datetime="comment.date" class="comment-card-date">
          {{ comment.date | formatDate }}
        </time>
        <div class="comment-card-body" v-html="comment.content" />
        <AppButton :alt="shouldShowReplyForm" @click="toggleReplyForm">
          {{ replyButtonText }}
        </AppButton>
      </div>
    </div>
    <CreateCommentForm
      v-if="computedShowReplyForm"
      ref="commentForm"
      :parent-comment-id="comment.commentId"
      :post-id="postId"
      :title="`Replying to ${comment.author.name.split(' ')[0]}`"
      @cancel="onCancel"
      @success="onCreateCommentSuccess"
    />
    <CommentList
      v-if="comment.replies.nodes.length"
      :depth="depth + 1"
      :post-id="postId"
      :comments="comment.replies.nodes"
    />
  </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue';
import CreateCommentForm from '@/components/CreateCommentForm.vue';
import { focusFirstFocusable } from '../utils/helpers';

export default {
  name: 'CommentCard',
  components: {
    CommentList,
    CreateCommentForm,
  },
  props: {
    depth: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      shouldShowReplyForm: false,
    };
  },
  computed: {
    computedShowReplyForm() {
      return this.depth < 5 && this.shouldShowReplyForm;
    },
    replyButtonText() {
      if (this.shouldShowReplyForm) {
        return 'Hide';
      }
      return `Reply to ${this.comment.author.name}`;
    },
  },
  methods: {
    getLinkForAuthor(author) {
      if (!author.userId) {
        return '';
      }
      return `/authors/${author.userId}`;
    },
    async toggleReplyForm() {
      this.shouldShowReplyForm = !this.shouldShowReplyForm;

      // Wait for it to render
      await this.$nextTick();
      if (this.shouldShowReplyForm) {
        focusFirstFocusable(this.$refs.commentForm.$el);
      }
    },
    onCancel() {
      this.shouldShowReplyForm = false;
    },
    onCreateCommentSuccess() {
      this.shouldShowReplyForm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-card {
  margin-top: $spacing-4;
  padding: $spacing-4 $spacing-6;
  background: #fff;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e9ecf2;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #c5cada;
  }
}

.comment-card-name,
.comment-card-date {
  display: block;
}

.comment-card-name {
  padding-bottom: $spacing;
  font-size: 19px;
  font-weight: 500;
}

.comment-card-date {
  font-size: 14px;
  color: $text-tertiary;
  padding-bottom: $spacing-3;
}

.comment-card-body {
  font-size: 17px;
  line-height: 1.6;
  padding-bottom: $spacing-2;
  color: $text-secondary;

  &::v-deep {
    p,
    ul,
    ol {
      margin-bottom: $spacing-2;
    }

    b,
    strong {
      font-weight: 500;
    }

    i,
    emphasis {
      font-style: italic;
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

.app-button {
  height: 32px;
  padding: 0 $spacing-3;
  font-size: 13px;
}

.create-comment {
  margin-top: $spacing-2;
}
</style>
