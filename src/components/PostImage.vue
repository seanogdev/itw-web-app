<template>
  <component
    :is="containerComponent.type"
    v-bind="containerComponent.props"
    class="post-image"
  >
    <img
      v-if="image && image.sourceUrl"
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
      default: null,
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
          title: this.image ? this.image.altText : '',
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.post-image {
    width: 100%;
    height: 240px;
    display: block;
    background: #e1e6ee;
}
.post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 0;
}

</style>
