<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="post-single">
    <Loading v-if="$apollo.queries.post.loading" class="post-single-loader" />
    <EmptyState v-else-if="!post" message="Post not found" />
    <template v-else>
      <div class="post-single-box">
        <PostImage :post="post" :height="400" />
        <div class="post-single-main">
          <PostMeta :post="post" />
          <h1 class="post-single-title">
            {{ post.title | decode }}
          </h1>
          <span class="post-single-author">
            Written by
            <router-link :to="`/author/${post.author.userId}`">{{ authorName }}</router-link>
          </span>
          <div class="post-single-content" v-html="post.content" />
        </div>
      </div>
      <AuthorBox ref="authorBox" :author="post.author" />
      <Intersect root-margin="0px 0px 500px 0px" @enter="loadComments">
        <div v-if="!comments" class="post-single-comments-load-more">
          <app-button @click="loadComments">Load comments</app-button>
        </div>
      </Intersect>
      <Loading v-if="!comments && $apollo.queries.comments.loading" />
      <div v-else-if="comments" class="post-single-comments">
        <CollectionHeader>Comments</CollectionHeader>
        <CommentList
          v-if="comments.nodes.length"
          :post-id="post.postId"
          :comments="comments.nodes"
        />
        <div v-else class="post-single-comments-load-more">
          There are no comments on this post yet. Be the first!
        </div>
        <CreateCommentForm title="Leave a new comment" :post-id="post.postId" />
      </div>
    </template>
  </div>
</template>

<script>
import { Intersect } from 'vue-observable';
import getCommentsByPostId from '@/apollo/queries/getCommentsByPostId';
import getPostBySlug from '@/apollo/queries/getPostBySlug';
import { decode, generateAuthorName } from '@/utils/helpers';

import AuthorBox from '@/components/AuthorBox.vue';
import CollectionHeader from '@/components/CollectionHeader.vue';
import CommentList from '@/components/CommentList.vue';
import CreateCommentForm from '@/components/CreateCommentForm.vue';
import EmptyState from '@/components/EmptyState.vue';
import PostImage from '@/components/PostImage.vue';
import PostMeta from '@/components/PostMeta.vue';

export default {
  components: {
    AuthorBox,
    CollectionHeader,
    CommentList,
    CreateCommentForm,
    EmptyState,
    Intersect,
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
      skip: true,
    },
  },
  computed: {
    authorName() {
      return generateAuthorName(this.post.author);
    },
  },
  methods: {
    loadComments() {
      this.$apollo.queries.comments.skip = false;
    },
  },
  metaInfo() {
    return {
      title: this.post ? decode(this.post.title) : null,
    };
  },
};
</script>

<style lang="scss" scoped>
.post-single {
  max-width: $app-width * 0.8;
  margin: 0 auto;
}

.post-single-box {
  background: #fff;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e9ecf2;
  margin-bottom: $spacing-4;
}

.post-meta {
  margin-bottom: $spacing * 3;
  font-size: 15px;
}

.post-single-loader {
  margin-top: calc(100% - #{$spacing/2});
}

.post-single-main {
  padding: $spacing-4;

  @media (min-width: 800px) {
    padding: $spacing-4 $spacing-6 $spacing-6;
  }
}

.post-single-title {
  font-size: 29px;
  line-height: 1.4;
  margin-bottom: $spacing;
  @media (min-width: 800px) {
    font-size: 40px;
  }
}

.post-single-author {
  font-size: 18px;
  color: $text-tertiary;
  font-weight: 300;
  display: inline-block;
  margin-bottom: $spacing-4;
  button {
    font-weight: 300;
    font-size: 18px;
    color: $app-primary;
    background: transparent;
    text-align: left;
  }
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

    .wp-caption-text {
      font-size: 13px;
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
      font-weight: 600;
    }

    i,
    emphasis {
      font-style: italic;
    }

    h1,
    h2,
    h3,
    h4 {
      margin-top: $spacing-4;
      margin-bottom: $spacing;
      font-weight: 500;
    }

    h1 {
      font-size: 28px;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 20px;
    }

    ul ul,
    ol ol {
      /* Add a margin for any <ul> inside another <ul> */
      margin-left: $spacing-2;
    }
  }
}

.author-box {
  margin-bottom: $spacing-4;
}

.post-single-comments {
  margin: 0 auto $spacing-8;
  max-width: $app-width * 0.8;

  .comment-list {
    padding-bottom: $spacing-4;
  }
}

.post-single-comments-load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-bottom: $spacing-4;
  font-size: 18px;
}
</style>
