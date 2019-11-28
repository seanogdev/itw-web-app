<template>
  <div
    class="app-header-dropdown"
    :class="dropdownClasses"
  >
    <button
      type="button"
      @click="toggleOpen"
    >
      {{ buttonTitle }}
    </button>
    <div class="app-header-dropdown-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    dropdownClasses() {
      return [
        { 'app-header-dropdown--is-open': this.isOpen },
      ];
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
