<template>
  <component :is="tag" class="dropdown-item" v-bind="computedProps" v-on="$listeners">
    <slot />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    computedProps() {
      const props = { ...this.$attrs };
      if (this.tag === 'button') {
        props.type = 'button';
      }

      return props;
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  padding: $spacing-2 $spacing-2;
  display: block;
  background: #fff;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  text-align: left;
  color: $app-primary;

  &:not(:first-child) {
    border-top: 1px solid $border;
  }

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    background: $border;
    border-color: $border-hover;
    color: darken($app-primary, 10%);
  }

  &:first-child:hover {
    & + .dropdown-item {
      border-color: $border-hover;
    }
  }
}
</style>
