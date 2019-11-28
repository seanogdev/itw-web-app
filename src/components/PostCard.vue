<template>
  <div class="post-card">
    <post-image
      v-if="post.featuredImage"
      :image="post.featuredImage"
      :link="postUrl"
    />
    <div class="post-card-main">
      <post-meta :post="post" />
      <router-link :to="postUrl">
        <h3>{{ post.title }}</h3>
      </router-link>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="post-card-content"
        v-html="post.excerpt"
      />
    </div>
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script>
import { parseWpUrl } from '@/utils/helpers';
import PostImage from '@/components/PostImage.vue';
import PostMeta from '@/components/PostMeta.vue';

export default {
  components: {
    PostImage,
    PostMeta,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    postUrl() {
      return parseWpUrl(this.post.link);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  background: #fff;
  overflow: hidden;
  border-radius: 4px;
}

.post-card-main {
  padding: 24px;
}
a {
  color: #42b983;
}
img {
  width: 100%;
  object-fit: fill;
  object-position: top center;
}
</style>
