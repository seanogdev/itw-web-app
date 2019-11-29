<template>
  <div
    class="post-image"
    :style="styles"
  >
    <img
      :src="imageUrl"
      :srcset="image ? image.srcSet : null"
      :alt="image ? image.altText : null"
      :loading="loading"
    >
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
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
    imageUrl() {
      if (this.image && this.image.sourceUrl) {
        return this.image.sourceUrl;
      }
      // eslint-disable-next-line no-underscore-dangle
      return `https://picsum.photos/seed/${this._uid}/200/300`;
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
