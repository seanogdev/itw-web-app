<template>
  <v-popover ref="dropdown" class="dropdown" v-bind="$attrs">
    <app-button class="dropdown-button" alt type="button" :title="altButtonTitle || buttonTitle">
      <slot name="button" :button-title="buttonTitle">{{ buttonTitle }}</slot>
      <ChevronDown v-if="showChevron" class="dropdown-chevron"></ChevronDown>
    </app-button>
    <template slot="popover">
      <slot />
    </template>
  </v-popover>
</template>

<script>
// eslint-disable-next-line import/extensions
import ChevronDown from '@/assets/chevron-down.svg?inline';

export default {
  components: {
    ChevronDown,
  },
  inheritAttrs: false,
  props: {
    altButtonTitle: {
      type: String,
      default: '',
    },
    buttonTitle: {
      type: String,
      default: '',
    },
    showChevron: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.app-button .dropdown-chevron {
  margin-left: $spacing;
  transition: transform 0.2s ease-in-out;
  width: 10px;
}

.open .app-button .dropdown-chevron {
  transform: rotate(-180deg);
}

.tooltip {
  display: block !important;
  z-index: 2;

  .tooltip-inner {
    border: 1px solid $border;
    background: white;
    border-radius: 16px;
    padding: $spacing/2 $spacing 4px;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    .tooltip-inner {
      border-color: $border-hover;
    }
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: $spacing/2;
    border-color: #fff;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: $spacing/2;

    .tooltip-arrow {
      border-width: $spacing/2 $spacing/2 0 $spacing/2;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -$spacing/2;
      left: calc(50% - #{$spacing/2});
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: $spacing/2;

    .tooltip-arrow {
      border-width: 0 $spacing/2 $spacing/2 $spacing/2;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -$spacing/2;
      left: calc(50% - #{$spacing/2});
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: $spacing/2;

    .tooltip-arrow {
      border-width: $spacing/2 $spacing/2 $spacing/2 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -$spacing/2;
      top: calc(50% - #{$spacing/2});
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: $spacing/2;

    .tooltip-arrow {
      border-width: $spacing/2 0 $spacing/2 $spacing/2;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -$spacing/2;
      top: calc(50% - #{$spacing/2});
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    .popover-inner {
      background: #fff;
      overflow: hidden;
      padding: 0;
      margin: 0;
      border-radius: 4px;
      box-shadow: 0 4px 4px rgba(#4b6070, 0.1);
    }

    .popover-arrow {
      border-color: #fff;
    }

    &:focus {
      outline: none;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
