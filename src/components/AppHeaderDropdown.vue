<template>
  <div
    class="app-header-dropdown"
    :class="dropdownClasses"
  >
    <button
      class="app-header-dropdown__button"
      type="button"
      @click="toggle"
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
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      Object.values(this.$parent.$refs).filter(
        // eslint-disable-next-line no-underscore-dangle
        (ref) => ref._uid !== this._uid,
      ).forEach((ref) => {
        console.log('ref:', ref);
        ref.close();
      });
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
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
    margin-right: $spacing-2;
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
        color: darken($text-primary, 10%);
    }

    svg {
        margin-left: $spacing;
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
    min-height: 300px;
    display: block;
    left: 0;
    background: #fff;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.2s ease-in-out;
    visibility: hidden;
    padding: $spacing-4 0;

    .app-header-dropdown--is-open & {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    &::v-deep {
        ul {
            max-width: $app-width;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-gap: $spacing * 3;
            grid-auto-flow: row dense;
        }
        li {
            margin-bottom: 8px;
            line-height: 1.5;
            font-size: 17px;
        }
    }
}

</style>
