<template>
  <component :is="tag" class="app-button" :class="classes" v-bind="computedProps" v-on="$listeners">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    alt: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedProps() {
      let props = {};
      if (this.tag === 'button') {
        props.type = 'button';
      }

      props = { ...props, ...this.props };

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
  display: inline-block;
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
}

.app-button--alt {
  background: transparent;
  border: 1px solid #e9ecf2;
  color: $text-secondary;
  &:disabled {
    background: transparent;
    border-color: lighten(#e9ecf2, 40%);
  }

  &:hover,
  &:focus,
  &:active {
    background: transparent;
    border-color: darken(#e9ecf2, 40%);
  }
}
</style>
