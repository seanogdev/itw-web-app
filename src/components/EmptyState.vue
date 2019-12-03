<template>
  <div class="empty-state">
    <span class="empty-state-emoji">😢</span>
    <span class="empty-state-text">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Not Found',
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.empty-state-emoji {
  font-size: 140px;
  line-height: 1.1;
  margin-bottom: $spacing-4;
}

.empty-state-text {
  font-size: 36px;
  font-weight: 500;
}
</style>
