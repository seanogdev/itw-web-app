<template>
  <component
    :is="tag"
    class="collection-header"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'h3',
    },
  },
};
</script>

<style lang="scss" scoped>
.collection-header {
  display: inline-block;
  color: #373753;
  padding-bottom: $spacing;
  border-bottom: 1px solid rgba(#373753, 0.5);
  font-size: 24px;
  font-weight: 600;
  &:hover {
    border-color: #373753;
  }
}
</style>
