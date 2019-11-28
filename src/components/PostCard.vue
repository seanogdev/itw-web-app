<template>
  <div class="post-card">
    <post-image
      :image="post.featuredImage"
      :link="postUrl"
    />
    <div class="post-card-main">
      <post-meta :post="post" />
      <router-link
        v-slot="{ href, navigate }"
        :to="postUrl"
      >
        <h3 class="post-card-title">
          <a
            :href="href"
            @click="navigate"
          > {{ post.title }}</a>
        </h3>
      </router-link>
      <!-- eslint-disable vue/no-v-html -->
      <div class="post-card-content">
        {{ post.excerpt | stripHtml | truncate(40) }}&hellip;
      </div>
      <router-link
        :to="postUrl"
        class="post-card-more-link"
      >
        Read more...
      </router-link>
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
  border: 1px solid #e9ecf2;
}

.post-meta {
  margin-bottom: $spacing * 3;
}

.post-card-main {
  padding: $spacing * 3 $spacing-2;
}

.post-card-title {
  font-size: 19px;
  font-weight: 400;
  margin-bottom: $spacing-2;
  a {
    color: $text-primary;
  }
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

.post-card-more-link {
  font-size: 13px;
}
</style>
