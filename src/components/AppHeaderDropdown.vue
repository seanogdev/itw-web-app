<template>
  <div class="app-header-dropdown" :class="dropdownClasses">
    <button class="app-header-dropdown__button" type="button" @click="toggle">
      {{ buttonTitle }}
      <ChevronDown />
    </button>
    <div class="app-header-dropdown__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
  computed: {
    ...mapState(['activeHeaderTab']),
    dropdownClasses() {
      return [{ 'app-header-dropdown--is-open': this.isOpen }];
    },
    isOpen() {
      return this.activeHeaderTab === this.buttonTitle;
    },
  },
  methods: {
    ...mapActions(['updateSearchInput', 'updateActiveHeaderTab', 'resetActiveHeaderTab']),
    toggle() {
      if (this.isOpen) {
        this.resetActiveHeaderTab();
      } else {
        this.updateActiveHeaderTab(this.buttonTitle);
      }
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
  max-height: 600px;
  overflow: scroll;
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
      overflow: hidden;
      overflow-y: scroll;
      display: block;
      margin: 0 auto;
      columns: 4;
      column-gap: $spacing-4;
    }
    li {
      margin-bottom: $spacing-2;
      font-size: 14px;
    }
  }
}
</style>
