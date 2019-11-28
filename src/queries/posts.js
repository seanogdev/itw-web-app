import gql from 'graphql-tag';

export const GET_POSTS_QUERY = (g) => g`
  query getPosts ($searchString: String, $first: Int, $after: String) {
    posts ( where: { search: $searchString }, first: $first, after: $after ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          link
          postId
          date
          title
          excerpt
          featuredImage {
            altText
            sourceUrl
            srcSet
            sizes
          }
          categories {
            edges {
              node {
                link
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POSTS_QUERY_CATEGORIES = (g) => g`
  query getPosts ($slug: String, $first: Int, $after: String) {
    posts ( where: { categoryName: $slug }, first: $first, after: $after ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          link
          postId
          date
          title
          excerpt
          featuredImage {
            altText
            sourceUrl
            srcSet
            sizes
          }
          categories {
            edges {
              node {
                link
                name
              }
            }
          }
        }
      }
    }
  }
`;


export const GET_POST_BY_SLUG = gql`
      query getPostBySlug($slug: String!) {
        post: postBy(slug: $slug) {
          link
          postId
          title
          date
          content
          featuredImage {
            altText
            sourceUrl
            srcSet
            sizes
          }
          categories {
            edges {
              node {
                link
                name
              }
            }
          }
        }
      }
    `;
