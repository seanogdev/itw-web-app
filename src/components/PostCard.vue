<template>
  <div class="post-card">
    <router-link :to="postUrl">
      {{ post.title }}
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
    postUrl() {
      return new URL(this.post.link).pathname;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}
</style>
