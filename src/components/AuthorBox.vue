<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="author-box">
    <div v-if="author.avatar" class="author-box-image">
      <img :src="author.avatar.url" :alt="authorName" loading="lazy" width="150px" height="150px" />
    </div>
    <div class="author-box-content">
      <router-link v-slot="{ href, navigate }" :to="`/author/${author.userId}`">
        <h3 class="author-box-name">
          <a :href="href" @click="navigate">{{ authorName }}</a>
        </h3>
      </router-link>
      <div class="author-box-description" v-html="authorDescription" />
      <div class="author-box-links">
        <router-link :to="`/author/${author.userId}`">
          View all posts by {{ author.firstName }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { nl2br, linkify, decode } from '@/utils/helpers';

export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  computed: {
    authorName() {
      if (this.author.firstName && this.author.lastName) {
        return `${this.author.firstName} ${this.author.lastName}`;
      }
      return this.author.name;
    },
    authorDescription() {
      if (!this.author.description) {
        return '';
      }
      return nl2br(linkify(decode(this.author.description)));
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
  display: grid;
  grid-template-rows: 150px auto;
  grid-gap: $spacing-4;

  @media (min-width: 800px) {
    grid-template-rows: unset;
    grid-template-columns: 150px auto;
    grid-gap: $spacing-6;
  }

  &:hover {
    border-color: #c5cada;
  }
}
.author-box-image {
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-self: center;
}

.author-box-name {
  font-size: 24px;
  margin-bottom: $spacing-2;
}

.author-box-description {
  margin-bottom: $spacing-4;
  &::v-deep {
    * {
      line-height: 1.5;
      color: $text-secondary;
    }
    p {
      margin-bottom: $spacing;
    }

    a {
      color: $app-primary;
    }
  }
}

.author-box-links {
  font-size: 16px;
  font-weight: 500;
}
</style>
