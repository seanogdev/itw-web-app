<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="comment">
    <div class="comment-card">
      <router-link
        v-if="comment.author.avatar"
        :to="comment.author.internalLink"
        class="comment-card-avatar"
      >
        <img :src="comment.author.avatar.url" width="50" :alt="comment.author.fullName" />
      </router-link>
      <div class="comment-card-content">
        <div class="comment-card-buttons">
          <app-button v-if="shouldShowDeleteButton" alt @click="deleteComment">
            Delete
          </app-button>
        </div>
        <router-link
          v-if="comment.author.internalLink"
          :to="comment.author.internalLink"
          class="comment-card-name"
        >
          {{ comment.author.fullName }}
        </router-link>
        <div v-else class="comment-card-name">{{ comment.author.fullName }}</div>
        <time :datetime="comment.date" class="comment-card-date">
          {{ comment.date | formatDate }}
        </time>
        <div class="comment-card-body" v-html="comment.content" />
        <AppButton v-if="shouldShowReplyButton" :alt="shouldShowReplyForm" @click="toggleReplyForm">
          {{ replyButtonText }}
        </AppButton>
      </div>
    </div>
    <CreateCommentForm
      v-if="shouldShowReplyForm"
      ref="commentForm"
      :parent-comment-id="comment.commentId"
      :post-id="postId"
      :title="`Replying to ${comment.author.name.split(' ')[0]}`"
      @cancel="onCancel"
      @success="onCreateCommentSuccess"
    />
    <CommentList
      v-if="comment.replies && comment.replies.nodes.length"
      :key="comment.replies.nodes.length"
      :depth="depth + 1"
      :post-id="postId"
      :parent-comment-id="comment.commentId"
      :comments="comment.replies.nodes"
    />
  </div>
</template>

<script>
import { focusFirstFocusable, findComments } from '@/utils/helpers';
import getCommentsByPostId from '@/apollo/queries/getCommentsByPostId';
import deleteComment from '@/apollo/mutations/deleteComment';

import CommentList from '@/components/CommentList.vue';
import CreateCommentForm from '@/components/CreateCommentForm.vue';
import getCurrentUser from '@/apollo/queries/getCurrentUser';

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
    parentCommentId: {
      type: Number,
      default: null,
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
    shouldShowDeleteButton() {
      return this.isCurrentUserCommentAuthor || this.isCurrentUserCommentModerator;
    },
    isCurrentUserCommentAuthor() {
      return (
        this.currentUser &&
        this.comment.author &&
        this.currentUser.userId === this.comment.author.userId
      );
    },
    isCurrentUserCommentModerator() {
      return this.currentUser && this.currentUser.capabilities.includes('moderate_comments');
    },
    currentUser() {
      const query = this.$apollo.provider.defaultClient.readQuery({
        query: getCurrentUser,
      });
      return query && query.currentUser ? query.currentUser : null;
    },
    shouldShowReplyButton() {
      return this.depth < 5 && !!this.currentUser;
    },
    replyButtonText() {
      if (this.shouldShowReplyForm) {
        return 'Hide';
      }
      return `Reply to ${this.comment.author.name}`;
    },
  },
  methods: {
    async deleteComment() {
      if (this.isCurrentUserCommentModerator && !this.isCurrentUserCommentAuthor) {
        // eslint-disable-next-line no-alert
        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if (!confirm) {
          return;
        }
      }
      await this.$apollo.mutate({
        mutation: deleteComment,
        variables: {
          commentId: this.comment.id,
          clientMutationId: 'deleteComment',
        },
        optimisticResponse: {
          deleteComment: {
            deletedId: this.comment.id,
            clientMutationId: 'deleteComment',
            comment: {
              commentId: this.comment.commentId,
              __typename: 'Comment',
            },
            __typename: 'DeleteCommentPayload',
          },
        },
        update: (
          store,
          {
            data: {
              deleteComment: {
                comment: { commentId },
              },
            },
          },
        ) => {
          const query = {
            query: getCommentsByPostId,
            variables: { postId: this.postId },
          };
          const data = store.readQuery(query);
          findComments({
            commentId: this.parentCommentId,
            comments: data.comments,
            // eslint-disable-next-line no-unused-vars
            onFound: (comments) => {
              // eslint-disable-next-line no-param-reassign
              const index = comments.findIndex((comment) => comment.commentId === commentId);
              if (index !== -1) {
                comments.splice(index, 1);
              }
            },
          });

          store.writeQuery({ ...query, data });
        },
      });
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
  border-radius: 4px;
  border: 1px solid #e9ecf2;
  transition: all 0.2s ease-in-out;
  display: flex;

  &:hover {
    border-color: #c5cada;
  }
}

.comment-card-avatar {
  flex: 0 0 50px;
  margin-right: $spacing-2;
  overflow: hidden;
  border-radius: 50%;
  height: 50px;
}

.comment-card-content {
  flex: 1 1 auto;
  position: relative;
}

.comment-card-buttons {
  position: absolute;
  right: 0;
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

    img,
    video,
    iframe {
      max-width: 100%;
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
