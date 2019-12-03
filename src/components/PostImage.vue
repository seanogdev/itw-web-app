<template>
  <div class="post-image" :style="styles">
    <img
      :src="imageUrl"
      :srcset="post.image ? post.image.srcSet : null"
      :alt="post.image ? post.image.altText : null"
      :loading="loading"
    />
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
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
      if (this.post.featuredImage && this.post.featuredImage.sourceUrl) {
        return this.post.featuredImage.sourceUrl;
      }
      // eslint-disable-next-line no-underscore-dangle
      return `https://picsum.photos/seed/${this.post.postId}/800/1280`;
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
