<template>
  <component :is="tag" class="app-button" :class="classes" v-bind="computedProps" v-on="$listeners">
    <Loading v-if="loading" />
    <slot v-else />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    alt: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'button',
    },
  },

  computed: {
    computedProps() {
      let props = {};
      if (this.tag === 'button') {
        props.type = 'button';
      }

      props = {
        ...props,
        ...this.$attrs,
        ...this.props,
      };

      return props;
    },
    classes() {
      return [{ 'app-button--alt': this.alt }];
    },
  },
};
</script>

<style lang="scss" scoped>
.app-button {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 16px;
  color: #fff;
  background: $app-primary;
  border-radius: 4px;
  padding: 0 $spacing-2;
  transition: all 0.2s ease-in-out;

  &:disabled {
    &,
    &:hover,
    &:focus,
    &:active {
      background: #cbccd7;
      cursor: normal;
    }
  }

  &:hover,
  &:focus,
  &:active {
    background: #4461d7;
    cursor: pointer;
  }

  .loader {
    //sass-lint:disable-block no-combinators
    &::v-deep {
      & > * {
        background: #fff;
      }
    }
  }
}

.app-button--alt {
  background: transparent;
  border: 1px solid $border;
  color: $text-secondary;
  &:disabled {
    background: transparent;
    border-color: lighten($border, 40%);
  }

  &:hover,
  &:focus,
  &:active {
    background: transparent;
    border-color: darken($border, 40%);
  }
}
</style>
