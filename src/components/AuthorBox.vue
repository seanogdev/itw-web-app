<template>
  <div class="author-box">
    <div class="author-box-image"></div>
    <div class="author-box-content">
      <h3 class="author-box-name">{{ author.nickname }}</h3>
      <p class="author-box-description">{{ author.description }}</p>
      <div class="author-box-links"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.author-box {
  padding: $spacing-4 $spacing-6;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e9ecf2;
  transition: all 0.2s ease-in-out;
  display: flex;

  &:hover {
    border-color: #c5cada;
  }
}
.author-box-image {
}
.author-box-content {
}
.author-box-name {
}
.author-box-description {
}
.author-box-links {
}
</style>
