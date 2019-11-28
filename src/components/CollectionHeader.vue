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
    display: inline;
    color: #373753;
    padding-bottom: $spacing;
    border-bottom: 1px solid rgba(#373753, 0.5);
    &:hover {
        border-color: #373753;
    }
}

</style>
