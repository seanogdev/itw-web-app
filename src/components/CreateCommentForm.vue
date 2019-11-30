<template>
  <form ref="form" class="create-comment" @submit.prevent="submitComment">
    <h3 v-if="title" class="create-comment-title">{{ title }}</h3>
    <textarea
      id=""
      v-model="message"
      class="create-comment-message"
      :name="textareaKey"
      cols="30"
      rows="10"
      @keydown.enter="submitComment"
    ></textarea>
    <div class="create-comment-buttons">
      <AppButton v-if="showCancelButton" alt class="create-comment-submit" @click="$emit('cancel')">
        Cancel
      </AppButton>

      <AppButton class="create-comment-submit">Add comment</AppButton>
    </div>
  </form>
</template>

<script>
import createComment from '@/apollo/mutations/createComment';

export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
    parentCommentId: {
      type: Number,
      required: true,
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
