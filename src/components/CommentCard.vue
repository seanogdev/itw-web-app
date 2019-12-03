<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="comment">
    <div v-if="!isEditing" class="comment-card">
      <router-link
        v-if="comment.author.avatar"
        :to="comment.author.internalLink"
        class="comment-card-avatar"
      >
        <img :src="comment.author.avatar.url" width="50" :alt="comment.author.fullName" />
      </router-link>
      <div class="comment-card-content">
        <Dropdown class="comment-card-buttons" placement="bottom-end">
          <template #button>
            <Kebab />
          </template>

          <template #default>
            <DropdownItem
              v-if="shouldShowEditButton"
              title="Edit this comment"
              @click="toggleEditForm"
            >
              Edit comment
            </DropdownItem>
            <DropdownItem
              v-if="shouldShowDeleteButton"
              title="Delete this comment"
              @click="deleteComment"
            >
              Delete comment
            </DropdownItem>
          </template>
        </Dropdown>
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
        <AppButton
          v-if="shouldShowReplyButton"
          class="comment-reply-button"
          :alt="shouldShowReplyForm"
          @click="toggleReplyForm"
        >
          {{ replyButtonText }}
        </AppButton>
      </div>
    </div>
    <CommentForm
      v-if="shouldShowCommentForm"
      ref="commentForm"
      v-bind="commentFormProps"
      @cancel="onCancel"
      @success="onSuccess"
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
import { findComments } from '@/utils/helpers';
import getCommentsByPostId from '@/apollo/queries/getCommentsByPostId';
import deleteComment from '@/apollo/mutations/deleteComment';
import getCurrentUser from '@/apollo/queries/getCurrentUser';

import CommentList from '@/components/CommentList.vue';
import CommentForm from '@/components/CommentForm.vue';
// eslint-disable-next-line import/extensions
import Kebab from '@/assets/kebab.svg?inline';

export default {
  name: 'CommentCard',
  components: {
    CommentList,
    CommentForm,
    Kebab,
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
      isEditing: false,
      shouldShowReplyForm: false,
    };
  },
  computed: {
    commentFormProps() {
      let props = {};
      if (this.isEditing) {
        props = {
          comment: this.comment,
          postId: this.postId,
          title: 'Edit comment',
          type: 'edit',
        };
      } else if (this.shouldShowReplyForm) {
        props = {
          parentCommentId: this.comment.commentId,
          postId: this.postId,
          title: `Replying to ${this.comment.author.name.split(' ')[0]}`,
          type: 'reply',
        };
      }
      return props;
    },
    shouldShowCommentForm() {
      return this.shouldShowReplyForm || this.isEditing;
    },
    shouldShowDeleteButton() {
      return this.isCurrentUserCommentAuthor || this.isCurrentUserCommentModerator;
    },
    shouldShowEditButton() {
      return (
        this.isCurrentUserCommentAuthor ||
        (this.isCurrentUserCommentModerator && !this.comment.author.userId)
      );
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
      // eslint-disable-next-line no-alert
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) {
        return;
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
    async toggleEditForm() {
      this.isEditing = !this.isEditing;

      // Wait for it to render
      if (this.isEditing) {
        await this.$nextTick();
        this.$refs.commentForm.autosize();
        this.$refs.commentForm.focus();
      }
    },
    async toggleReplyForm() {
      this.shouldShowReplyForm = !this.shouldShowReplyForm;

      // Wait for it to render
      await this.$nextTick();
      if (this.shouldShowReplyForm) {
        this.$refs.commentForm.focus();
      }
    },
    onCancel() {
      this.shouldShowReplyForm = false;
      this.isEditing = false;
    },
    onSuccess() {
      this.shouldShowReplyForm = false;
      this.isEditing = false;
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
  border: 1px solid $border;
  transition: all 0.2s ease-in-out;
  display: flex;

  &:hover {
    border-color: $border-hover;
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
  right: -$spacing;
  top: -$spacing;

  &::v-deep {
    .dropdown-button {
      border: none;
    }
  }
}

.comment-card-name {
  margin-bottom: $spacing;
  display: inline-block;
  font-size: 19px;
  font-weight: 500;
}

.comment-card-date {
  display: block;
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: $spacing-3;
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

.comment-reply-button {
  height: 32px;
  padding: 0 $spacing-3;
  font-size: 13px;
}

.comment-form {
  margin-top: $spacing-2;
}
</style>
