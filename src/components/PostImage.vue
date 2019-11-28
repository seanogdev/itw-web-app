<template>
  <component
    :is="containerComponent.type"
    v-bind="containerComponent.props"
    class="post-image"
  >
    <img
      :src="image.sourceUrl"
      :srcset="image.srcSet"
      :alt="image.altText"
      :loading="loading"
    >
  </component>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    loading: {
      type: String,
      default: 'lazy',
    },
  },
  computed: {
    containerComponent() {
      if (!this.link) {
        return {
          type: 'div',
          props: {},
        };
      }
      return {
        type: 'router-link',
        props: {
          to: this.link,
          title: this.image.altText,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.post-image {
  width: 100%;
  display: block;
}
.post-image img {
  width: 100%;
  height: 62.375%;
  object-fit: cover;
}
</style>
