<template>
  <form
    ref="form"
    class="comment-form"
    :class="commentFormClasses"
    :disabled="isLoading || !currentUser"
    @submit.prevent="submitComment"
  >
    <label v-if="title" :for="textareaKey" class="comment-form-title">{{ title }}</label>
    <AppTextarea
      :id="textareaKey"
      ref="textarea"
      v-model="$v.message.$model"
      :name="textareaKey"
      :disabled="!currentUser"
      :placeholder="placeholderMessage"
      @submit="submitComment"
    />
    <div class="comment-form-footer">
      <span v-if="$v.$error" class="comment-form-error">Please provide a message</span>
      <div class="comment-form-buttons">
        <AppButton
          v-if="shouldShowCancelButton"
          alt
          class="comment-form-submit"
          @click="$emit('cancel')"
        >
          Cancel
        </AppButton>

        <AppButton
          class="comment-form-submit"
          type="submit"
          :loading="isLoading"
          :disabled="$v.$error || !currentUser"
        >
          {{ submitButtonText }}
        </AppButton>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import autosize from 'autosize';
import getCurrentUser from '@/apollo/queries/getCurrentUser';
import createComment from '@/apollo/mutations/createComment';
import updateComment from '@/apollo/mutations/updateComment';
import getCommentsByPostId from '@/apollo/queries/getCommentsByPostId';
import { nl2br, findComments, stripHtml, findComment } from '@/utils/helpers';
import AppTextarea from '@/components/AppTextarea.vue';

export default {
  components: {
    AppTextarea,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    // For edit
    comment: {
      type: Object,
      default: null,
    },
    // For reply
    postId: {
      type: Number,
      required: true,
    },
    parentCommentId: {
      type: Number,
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
  computed: {
    commentFormClasses() {
      return [{ [`comment-form-${this.type}`]: this.type }];
    },
    currentUser() {
      const query = this.$apollo.provider.defaultClient.readQuery({
        query: getCurrentUser,
      });
      return query && query.currentUser ? query.currentUser : null;
    },
    placeholderMessage() {
      if (!this.currentUser) {
        return 'You must have an account to post a message';
      }
      return 'Your message here...';
    },
    shouldShowCancelButton() {
      return this.parentCommentId || this.comment;
    },
    submitButtonText() {
      return this.comment ? 'Update comment' : 'Add comment';
    },
    uniqueKey() {
      if (this.comment) {
        return this.comment.commentId;
      }
      if (this.parentCommentId) {
        return this.parentCommentId;
      }
      return 'new';
    },
    textareaKey() {
      return `comment-message-${this.uniqueKey}`;
    },
  },
  created() {
    if (this.comment) {
      this.message = stripHtml(this.comment.content);
    }
  },
  mounted() {
    autosize(this.$refs.textarea.$el);
  },
  methods: {
    autosize() {
      if (this.$refs.textarea.$el) {
        autosize.update(this.$refs.textarea.$el);
      }
    },
    focus() {
      const element = this.$refs.textarea.$el;
      if (element) {
        element.focus();
        element.setSelectionRange(element.value.length, element.value.length);
      }
    },
    submitComment() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.type === 'edit') {
        this.submitUpdateComment();
      } else {
        this.submitCreateComment();
      }
    },
    async submitCreateComment() {
      try {
        if (!this.currentUser) {
          return;
        }
        this.isLoading = true;
        await this.$apollo.mutate({
          mutation: createComment,
          variables: {
            clientMutationId: 'createComment',
            message: this.message,
            postId: this.postId,
            parentCommentId: this.parentCommentId,
            userId: this.currentUser.userId,
          },
          optimisticResponse: {
            createComment: {
              success: true,
              clientMutationId: 'createComment',
              comment: {
                commentId: -1,
                id: -1,
                approved: true,
                content: `${nl2br(this.message)}`,
                date: new Date().toISOString(),
                author: {
                  ...this.currentUser,
                  __typename: 'User',
                },
                replies: {
                  nodes: [],
                  __typename: 'CommentToCommentConnection',
                },
                type: 'uhm',
                __typename: 'Comment',
              },
              __typename: 'CreateCommentPayload',
            },
            __typename: 'Mutation',
          },
          update: (
            store,
            {
              data: {
                createComment: { comment },
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
              onFound: (comments) => {
                comments.push(comment);
              },
            });
            this.$emit('success');

            store.writeQuery({ ...query, data });
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
    async submitUpdateComment() {
      try {
        this.isLoading = true;
        await this.$apollo.mutate({
          mutation: updateComment,
          variables: {
            clientMutationId: 'updateComment',
            message: this.message,
            id: this.comment.id,
          },
          optimisticResponse: {
            updateComment: {
              success: true,
              clientMutationId: 'updateComment',
              comment: {
                commentId: this.comment.commentId,
                id: this.comment.id,
                approved: true,
                content: `${nl2br(this.message)}`,
                date: this.comment.date,
                author: this.comment.author,
                replies: this.comment.replies,
                type: 'uhm',
                __typename: 'Comment',
              },
              __typename: 'UpdateCommentPayload',
            },
            __typename: 'Mutation',
          },
          update: (
            store,
            {
              data: {
                updateComment: { comment },
              },
            },
          ) => {
            const query = {
              query: getCommentsByPostId,
              variables: { postId: this.postId },
            };
            const data = store.readQuery(query);
            findComment({
              commentId: this.comment.commentId,
              comments: data.comments,
              onFound: (prevComment) => {
                // eslint-disable-next-line no-param-reassign
                prevComment.content = comment.content;
              },
            });
            this.$emit('success');

            store.writeQuery({ ...query, data });
          },
        });
      } catch (e) {
        this.$emit('cancel');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-form {
  padding: $spacing-4 $spacing-6;
  background: #fff;
  border-radius: 4px;
  border: 1px solid $border;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  align-items: stretch;

  &:hover {
    border-color: $border-hover;
  }
}

.comment-form-title {
  margin-bottom: $spacing-2;
  font-size: 18px;
  color: $app-primary;
}

.comment-form-footer {
  display: flex;
  align-items: center;
  min-width: 0;
}

.comment-form-error {
  color: $app-primary;
  padding-right: $spacing-2;
  flex: 0 0 auto;
}

.comment-form-buttons {
  align-self: flex-end;
  flex: 0 1 auto;
  margin-left: auto;
  display: flex;

  & > *:not(:first-child) {
    margin-left: $spacing-2;
  }
}
</style>
