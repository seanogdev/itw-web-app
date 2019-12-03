<template>
  <div class="collection-header">
    <component :is="tag">
      <slot />
    </component>
  </div>
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
  display: block;
  margin-bottom: $spacing-4;

  & > * {
    display: inline-block;
    color: #373753;
    padding-bottom: $spacing;
    border-bottom: 1px solid rgba(#494e6a, 20%);
    font-size: 24px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: rgba(#494e6a, 30%);
    }
  }
}
</style>
