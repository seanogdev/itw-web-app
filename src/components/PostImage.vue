<template>
  <component
    :is="containerComponent.type"
    v-bind="containerComponent.props"
    class="post-image"
    :style="styles"
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
    height: {
      type: Number,
      default: 240,
    },
  },
  computed: {
    styles() {
      return { height: `${this.height}px` };
    },
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
    display: block;
    background: #e1e6ee;
}

.post-image--card {
    height: 240px;
}
.post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 0;
}

</style>
