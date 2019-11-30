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
        <!-- eslint-disable vue/no-v-html -->
        <div class="comment-card-body" v-html="comment.content" />
        <!-- eslint-enable vue/no-v-html -->
        <button @click="toggleReplyForm">Reply to {{ comment.author.name }}</button>
      </div>
    </div>
    <CreateCommentForm
      v-if="shouldShowReplyForm"
      :parent-comment-id="comment.commentId"
      :post-id="postId"
    />
    <CommentList
      v-if="comment.replies.nodes.length"
      :post-id="postId"
      :comments="comment.replies.nodes"
    />
  </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue';
import CreateCommentForm from '@/components/CreateCommentForm.vue';

export default {
  name: 'CommentCard',
  components: {
    CommentList,
    CreateCommentForm,
  },
  props: {
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
  methods: {
    getLinkForAuthor(author) {
      if (!author.userId) {
        return '';
      }
      return `/authors/${author.userId}`;
    },
    toggleReplyForm() {
      this.shouldShowReplyForm = !this.shouldShowReplyForm;
    },
  },
};
</script>

<style lang="scss">
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
  padding-bottom: $spacing-4;
}

.comment-card-body {
  font-size: 17px;
  line-height: 1.6;

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
</style>
