<template>
  <form ref="form" class="create-comment" @submit.prevent="submitComment">
    <label v-if="title" :for="textareaKey" class="create-comment-title">{{ title }}</label>
    <textarea
      :id="textareaKey"
      v-model="message"
      class="create-comment-message"
      :name="textareaKey"
      cols="30"
      rows="10"
      @keydown.enter="handleCmdEnter"
    ></textarea>
    <div class="create-comment-buttons">
      <AppButton v-if="showCancelButton" alt class="create-comment-submit" @click="$emit('cancel')">
        Cancel
      </AppButton>

      <AppButton v-else-if="message" alt class="create-comment-submit" @click="clearMessage">
        Clear
      </AppButton>

      <AppButton class="create-comment-submit">Add comment</AppButton>
    </div>
  </form>
</template>

<script>
import createComment from '@/apollo/mutations/createComment';
import { focusFirstFocusable } from '../utils/helpers';

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
    };
  },
  apollo: {
    createComment: {
      mutation: createComment,
    },
  },
  computed: {
    showCancelButton() {
      return !!this.parentCommentId;
    },
    textareaKey() {
      return `comment-message-${this.parentCommentId || 'new'}`;
    },
  },
  methods: {
    async clearMessage() {
      this.message = '';
      await this.$nextTick();
      focusFirstFocusable(this.$el);
    },
    handleCmdEnter(event) {
      const systemModifierKey = navigator.platform === 'MacIntel' ? event.metaKey : event.ctrlKey;
      if (systemModifierKey) {
        event.preventDefault();
        this.submitComment();
      }
    },
    submitComment() {
      this.$emit('success');
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
  margin-bottom: $spacing-4;
  border: 1px solid lighten($text-secondary, 40%);
  padding: $spacing-2;
  font-size: 16px;
  font-family: $font-family;
  line-height: 1.7;
  color: $text-secondary;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: $text-secondary;
  }
}

.create-comment-buttons {
  align-self: flex-end;

  & > *:not(:first-child) {
    margin-left: $spacing-2;
  }
}
</style>
