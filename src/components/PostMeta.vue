<template>
  <div class="post-meta">
    <time :datetime="post.date" class="post-meta__date">
      {{ post.date | formatDate }}
    </time>

    <router-link v-if="category" :to="category.internalLink">
      {{ category.name }}
    </router-link>
  </div>
</template>

<script>
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
