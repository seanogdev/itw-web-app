<template>
  <div
    class="app-header-dropdown"
    :class="dropdownClasses"
  >
    <button
      class="app-header-dropdown__button"
      type="button"
      @click="toggleOpen"
    >
      {{ buttonTitle }}
      <ChevronDown />
    </button>
    <div class="app-header-dropdown__content">
      <slot />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import ChevronDown from '@/assets/chevron-down.svg?inline';

export default {
  components: {
    ChevronDown,
  },
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
.app-header-dropdown__button {
    background: transparent;
    color: $text-primary;
    font-size: 15px;
    font-weight: 600;

    &:hover,
    &:focus {
        color: darken($text-primary, 10%);
    }

    svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
        transition: transform 0.2s ease-in;
    }

    .app-header-dropdown--is-open & {
        svg {
            transform: rotate(-180deg);
        }
    }
}

.app-header-dropdown__content {
    width: 100%;
    position: absolute;
    top: 100%;
    height: 300px;
    display: block;
    left: 0;
    background: #fff;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.2s ease-in-out;
    visibility: hidden;

    .app-header-dropdown--is-open & {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
