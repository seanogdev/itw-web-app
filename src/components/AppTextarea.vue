<template>
  <textarea
    :value="value"
    class="app-textarea"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    data-lpignore="true"
    rows="2"
    @input="$emit('input', $event.target.value)"
    @keydown.enter="handleCmdEnter"
  >
  </textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleCmdEnter(event) {
      const systemModifierKey = navigator.platform === 'MacIntel' ? event.metaKey : event.ctrlKey;
      if (systemModifierKey) {
        event.preventDefault();
        this.$emit('submit');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-textarea {
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
</style>
