<template>
  <form
    ref="form"
    class="create-comment"
    :disabled="isLoading || !currentUser"
    @submit.prevent="submitComment"
  >
    <label v-if="title" :for="textareaKey" class="create-comment-title">{{ title }}</label>
    <textarea
      :id="textareaKey"
      ref="textarea"
      v-model="$v.message.$model"
      class="create-comment-message"
      autocapitalize="off"
      autocomplete="off"
      :disabled="!currentUser"
      autocorrect="off"
      data-lpignore="true"
      :placeholder="placeholderMessage"
      rows="2"
      :name="textareaKey"
      @keydown.enter="handleCmdEnter"
    >
    </textarea>
    <span v-if="$v.$error" class="create-comment-error">Please provide a message</span>
    <div class="create-comment-buttons">
      <AppButton v-if="showCancelButton" alt class="create-comment-submit" @click="$emit('cancel')">
        Cancel
      </AppButton>

      <AppButton
        class="create-comment-submit"
        type="submit"
        :loading="isLoading"
        :disabled="$v.$error"
      >
        Add comment
      </AppButton>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import autosize from 'autosize';
import getCurrentUser from '@/apollo/queries/getCurrentUser';
import createCommentMutation from '@/apollo/mutations/createComment';
import getCommentsByPostId from '@/apollo/queries/getCommentsByPostId';
import { nl2br } from '@/utils/helpers';

export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
    parentCommentId: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      message: '',
      isLoading: false,
    };
  },
  validations: {
    message: {
      required,
    },
  },
  apollo: {
    currentUser: {
      query: getCurrentUser,
    },
  },
  computed: {
    showCancelButton() {
      return !!this.parentCommentId;
    },
    placeholderMessage() {
      if (!this.currentUser) {
        return 'You must have an account to post a message';
      }
      return 'Your message here...';
    },
    textareaKey() {
      return `comment-message-${this.parentCommentId || 'new'}`;
    },
  },
  mounted() {
    autosize(this.$refs.textarea);
  },
  methods: {
    handleCmdEnter(event) {
      const systemModifierKey = navigator.platform === 'MacIntel' ? event.metaKey : event.ctrlKey;
      if (systemModifierKey) {
        event.preventDefault();
        this.submitComment();
      }
    },
    async submitComment() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (!this.currentUser) {
        return;
      }
      this.isLoading = true;
      try {
        await this.$apollo.mutate({
          mutation: createCommentMutation,
          variables: {
            clientMutationId: 'clientMutationId',
            message: this.message,
            postId: this.postId,
            parentCommentId: this.parentCommentId,
            userId: this.currentUser.userId,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createComment: {
              __typename: 'CreateCommentPayload',
              success: true,
              clientMutationId: 'clientMutationId',
              comment: {
                __typename: 'Comment',
                commentId: -1,
                id: -1,
                approved: true,
                content: `${nl2br(this.message)}`,
                date: new Date().toISOString(),
                author: {
                  __typename: 'User',
                  name: this.currentUser.name || '',
                  firstName: this.currentUser.firstName,
                  lastName: this.currentUser.lastName,
                  userId: this.currentUser.userId,
                },
                replies: {
                  __typename: 'CommentToCommentConnection',
                  nodes: [],
                },
                type: 'uhm',
              },
            },
          },
          update: (
            store,
            {
              data: {
                createComment: { comment },
              },
            },
          ) => {
            const cachedData = store.readQuery({
              query: getCommentsByPostId,
              variables: { postId: this.postId },
            });
            if (this.parentCommentId) {
              this.updateParentComment(cachedData.comments.nodes, comment);
            } else {
              cachedData.comments.nodes.push(comment);
            }
            this.$emit('success');

            store.writeQuery({
              query: getCommentsByPostId,
              variables: { postId: this.postId },
              data: cachedData,
            });
          },
        });
        this.message = '';
        this.$v.$reset();
      } catch (e) {
        //
      } finally {
        this.isLoading = false;
      }
    },

    updateParentComment(nodes, comment) {
      // eslint-disable-next-line no-restricted-syntax
      for (const node of nodes) {
        if (node.commentId === this.parentCommentId) {
          node.replies.nodes.push(comment);
        } else if (node.replies && node.replies.nodes.length) {
          this.updateParentComment(node.replies.nodes, comment);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-comment {
  padding: $spacing-4 $spacing-6;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e9ecf2;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  align-items: stretch;

  &:hover {
    border-color: #c5cada;
  }
}

.create-comment-title {
  margin-bottom: $spacing-2;
  font-size: 18px;
  color: $app-primary;
}

.create-comment-message {
  margin-bottom: $spacing-2;
  border: 1px solid lighten($text-secondary, 40%);
  padding: $spacing-2;
  font-size: 16px;
  font-family: $font-family;
  line-height: 1.7;
  resize: none;
  color: $text-secondary;
  border-radius: 4px;

  &:disabled {
    opacity: 0.6;
  }

  &::placeholder {
    color: #c5cada;
  }

  &:focus {
    outline: none;
    border-color: $text-secondary;
    &::placeholder {
      color: #fff;
    }
  }
}

.create-comment-error {
  color: $app-primary;
  margin-bottom: $spacing-2;
}

.create-comment-buttons {
  align-self: flex-end;
  margin-top: $spacing-2;

  & > *:not(:first-child) {
    margin-left: $spacing-2;
  }
}
</style>
