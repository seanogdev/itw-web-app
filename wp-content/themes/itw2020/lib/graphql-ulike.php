<?php

add_action( 'graphql_register_types', function() {
  if (function_exists('wp_ulike_get_post_likes')) {
    register_graphql_field( 'Post', 'likes', [
      'type' => 'Int',
      'description' => __( 'The number of likes for the post', 'wp-graphql' ),
      'resolve' => function( $post ) {
        $count = get_post_meta($post->ID, '_liked', true);
        return $count ? $count : 0;
      }
    ] );
  }
  if (function_exists('wp_ulike_get_comment_likes')) {
    register_graphql_field( 'Comment', 'likes', [
      'type' => 'Int',
      'description' => __( 'The number of likes for the comment', 'wp-graphql' ),
      'resolve' => function( $comment ) {
        $count = get_comment_meta($comment->ID, '_commentliked', true);
        return $count ? $count : 0;
      }
    ] );
  }
} );
