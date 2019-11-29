<template>
  <div>
    <div
      class="post-single"
    >
      <template v-if="post">
        <PostImage
          :image="post.featuredImage"
          :height="400"
        />
        <div class="post-single-main">
          <PostMeta :post="post" />
          <h1 class="post-single-title">
            {{ post.title }}
          </h1>
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="post-single-content"
            v-html="post.content"
          />
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </template>
    </div>
    <div class="comments">
      <CollectionHeader>Comments</CollectionHeader>
      <CommentList :comments="post.comments" />
    </div>
  </div>
</template>

<script>
import getPostBySlug from '@/queries/getPostBySlug';

import CollectionHeader from '@/components/CollectionHeader.vue';
import CommentList from '@/components/CommentList.vue';
import PostImage from '@/components/PostImage.vue';
import PostMeta from '@/components/PostMeta.vue';

export default {
  components: {
    CollectionHeader,
    CommentList,
    PostImage,
    PostMeta,
  },
  apollo: {
    post: {
      query: getPostBySlug,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
    },
  },
  metaInfo() {
    return {
      title: this.post ? this.post.title : null,
    };
  },
};
</script>

<style lang="scss" scoped>
.post-single {
    background: #fff;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #e9ecf2;
    max-width: 8 * 120px;
    margin: 0 auto;
}

.post-meta {
    margin-bottom: $spacing * 3;
    font-size: 15px;
}

.post-single-main {
    padding: $spacing-4 $spacing-4;
}

.post-single-title {
    font-size: 29px;
    margin-bottom: $spacing-2;
}
.post-single-content {
    font-size: 17px;
    line-height: 1.6;

    &::v-deep {
        p,
        ul,
        ol {
            margin-bottom: $spacing-2;
        }
    }
}

</style>
