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
    border-bottom: 1px solid #b3b9ce;
    font-size: 24px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    &:hover {
        border-color: $text-secondary;
    }
}

</style>
