<template>
  <div class="post-meta">
    <time
      :datetime="post.date"
      class="post-meta__date"
    >
      {{ post.date | formatDate }}
    </time>

    <router-link
      v-if="category"
      :to="categoryUrl"
    >
      {{ category.name }}
    </router-link>
  </div>
</template>

<script>
import { parseWpUrl } from '@/utils/helpers';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    category() {
      if (this.post.categories.edges.length) {
        return this.post.categories.edges[0].node;
      }
      return null;
    },
    categoryUrl() {
      return this.category ? parseWpUrl(this.category.link) : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-meta {
  width: 100%;
  display: flex;
  font-size: 13px;

  & > * {
    flex: 0 0 auto;
  }
}

.post-meta__date {
  margin-right: auto;
}
</style>
