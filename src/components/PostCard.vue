<!-- eslint-disable vue/no-v-html -->
<template>
  <router-link :to="post.internalLink" class="post-card" :class="postCardClass">
    <PostImage :post="post" :height="imageHeight" />
    <div class="post-card-main">
      <post-meta :post="post" />
      <h3 class="post-card-title">
        {{ post.title | decode }}
      </h3>
      <div class="post-card-content">
        {{ post.excerpt | stripHtml | truncate(trunncationAmount) }}&hellip;
      </div>
    </div>
  </router-link>
</template>

<script>
import PostImage from '@/components/PostImage.vue';
import PostMeta from '@/components/PostMeta.vue';

export default {
  components: {
    PostImage,
    PostMeta,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    trunncationAmount: {
      type: Number,
      default: 40,
    },
    variant: {
      type: String,
      default: '',
    },
  },
  computed: {
    postCardClass() {
      return [{ [`post-card--${this.variant}`]: this.variant }];
    },
    imageHeight() {
      if (this.variant === 'large') {
        return 400;
      }
      return 240;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  background: #fff;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid $border;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: $border-hover;

    .post-card-title {
      color: $app-primary;
    }
  }
}

.post-card--large {
  @media (min-width: 800px) {
    display: flex;

    .post-image {
      flex: 1 1 400px;
    }
  }

  .post-card-title {
    font-size: 26px;
    font-weight: 500;
  }

  .post-meta {
    font-size: 15px;
  }

  .post-card-main {
    padding: $spacing-4;
  }
}

.post-meta {
  color: $text-primary;
  margin-bottom: $spacing * 3;
}

.post-card-main {
  padding: $spacing * 3 $spacing-2;
}

.post-card-title {
  font-size: 19px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: $spacing-2;
  color: $text-primary;
  transition: all 0.2s ease-in-out;
}

img {
  width: 100%;
  object-fit: fill;
  object-position: top center;
}

.post-card-content {
  color: $text-secondary;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: $spacing;
}
</style>
