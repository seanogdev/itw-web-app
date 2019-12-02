<template>
  <form
    ref="form"
    class="create-comment"
    :disabled="isLoading || !currentUser"
    @submit.prevent="submitComment"
  >
    <label v-if="title" :for="textareaKey" class="create-comment-title">{{ title }}</label>
    <AppTextarea
      :id="textareaKey"
      ref="textarea"
      v-model="$v.message.$model"
      :name="textareaKey"
      :disabled="!currentUser"
      :placeholder="placeholderMessage"
      @submit="submitComment"
    />
    <span v-if="$v.$error" class="create-comment-error">Please provide a message</span>
    <div class="create-comment-buttons">
      <AppButton v-if="showCancelButton" alt class="create-comment-submit" @click="$emit('cancel')">
        Cancel
      </AppButton>

      <AppButton
        class="create-comment-submit"
        type="submit"
        :loading="isLoading"
        :disabled="$v.$error || !currentUser"
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
import { nl2br, findComments } from '@/utils/helpers';
import AppTextarea from '@/components/AppTextarea.vue';

export default {
  components: {
    AppTextarea,
  },
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
  computed: {
    currentUser() {
      const query = this.$apollo.provider.defaultClient.readQuery({
        query: getCurrentUser,
      });
      return query && query.currentUser ? query.currentUser : null;
    },
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
    async submitComment() {
      this.$v.$touch();
      if (!this.currentUser || this.$v.$invalid) {
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
            createComment: {
              success: true,
              clientMutationId: 'clientMutationId',
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
