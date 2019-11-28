<template>
  <div class="app-header">
    <div class="app-header__content">
      <AppHeaderDropdown button-title="Categories" />
      <AppHeaderDropdown button-title="Authors" />
    </div>
  </div>
</template>

<script>
import AppHeaderDropdown from '@/components/AppHeaderDropdown.vue';

export default {
  components: {
    AppHeaderDropdown,
  },
};
</script>

<style lang="scss" scoped>
.app-header {
  background: #fff;
  height: 80px;
  box-shadow: 0 4px 4px rgba(#4B6070, 0.1);

}

.app-header__content {
  max-width: $app-width;
  margin: 0 auto;
}
</style>
