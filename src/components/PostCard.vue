<template>
  <router-link
    :to="postUrl"
    class="post-card"
  >
    <post-image
      :image="post.featuredImage"
    />
    <div class="post-card-main">
      <post-meta :post="post" />
      <h3 class="post-card-title">
        {{ post.title }}
      </h3>
      <!-- eslint-disable vue/no-v-html -->
      <div class="post-card-content">
        {{ post.excerpt | stripHtml | truncate(40) }}&hellip;
      </div>
      <span
        class="post-card-more"
      >
        Read more...
      </span>
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </router-link>
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
    cursor: pointer;
    border: 1px solid #e9ecf2;
    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: #c5cada;

        h3 {
            color: $app-primary;
        }
    }
}

.post-meta {
    color: $text-primary;
    margin-bottom: $spacing * 3;
}

.post-card-main {
    padding: $spacing * 3 $spacing-2;
}

.post-card-title {
    font-size: 19px;
    font-weight: 400;
    margin-bottom: $spacing-2;
    color: $text-primary;
}

img {
    width: 100%;
    object-fit: fill;
    object-position: top center;
}

.post-card-content {
    color: $text-secondary;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: $spacing;
}

.post-card-more {
    font-size: 13px;
}

</style>
