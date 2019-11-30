<template>
  <div>
    <Loading v-if="$apollo.queries.post.loading" />
    <EmptyState v-else-if="!post" message="Post not found" />
    <template v-else>
      <div class="post-single">
        <PostImage :post="post" :height="400" />
        <div class="post-single-main">
          <PostMeta :post="post" />
          <!-- eslint-disable vue/no-v-html -->
          <h1 class="post-single-title" v-html="post.title" />
          <div class="post-single-content" v-html="post.content" />
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </div>
      <div v-if="comments" class="post-comments">
        <CollectionHeader>Comments</CollectionHeader>
        <template v-if="comments.nodes.length">
          <CommentList :post-id="post.postId" :comments="comments.nodes" />
        </template>
        <CollectionHeader>Leave a new comment</CollectionHeader>
        <CreateCommentForm :post-id="post.postId" />
      </div>
    </template>
  </div>
</template>

<script>
import getCommentsByPostId from '@/apollo/queries/getCommentsByPostId';
import getPostBySlug from '@/apollo/queries/getPostBySlug';

import CollectionHeader from '@/components/CollectionHeader.vue';
import CommentList from '@/components/CommentList.vue';
import CreateCommentForm from '@/components/CreateCommentForm.vue';
import EmptyState from '@/components/EmptyState.vue';
import Loading from '@/components/Loading.vue';
import PostImage from '@/components/PostImage.vue';
import PostMeta from '@/components/PostMeta.vue';

export default {
  components: {
    CreateCommentForm,
    CollectionHeader,
    CommentList,
    EmptyState,

    Loading,
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
    comments: {
      query: getCommentsByPostId,
      variables() {
        return {
          postId: this.post.postId,
        };
      },
      skip() {
        // Wait until this post exists
        return !this.post;
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
  max-width: $app-width * 0.8;
  margin: 0 auto;
}

.post-meta {
  margin-bottom: $spacing * 3;
  font-size: 15px;
}

.post-single-main {
  padding: $spacing-4;

  @media (min-width: 800px) {
    padding: $spacing-4 $spacing-6;
  }
}

.post-single-title {
  font-size: 29px;
  margin-bottom: $spacing-2;
}
.post-single-content {
  font-size: 17px;
  line-height: 1.7;

  &::v-deep {
    p,
    ul,
    ol {
      margin-bottom: $spacing-2;
    }

    .wp-block-image {
      margin-bottom: $spacing-2;

      & > img {
        width: 100%;
      }
      .aligncenter {
        text-align: center;
      }
    }

    .wp-block-embed.is-type-video {
      margin: $spacing-4 0;
      width: 100%;
      .wp-block-embed__wrapper {
        width: calc(100% + #{$spacing * 12});
        position: relative;
        left: -$spacing-4;

        @media (min-width: 800px) {
          left: -$spacing-6;
        }

        iframe {
          width: 100%;
          height: 480px;
        }
      }
    }

    b,
    strong {
      font-weight: 500;
    }

    i,
    emphasis {
      font-style: italic;
    }

    h1,
    h2,
    h3,
    h4 {
      margin-top: $spacing;
      font-weight: 500;
    }

    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 18px;
    }
  }
}

.post-comments {
  margin: $spacing-8 auto;
  max-width: $app-width * 0.8;
}
</style>
