import gql from 'graphql-tag';

export default gql`
  query getPostsByAuthorId($id: Int!, $first: Int, $after: String) {
    posts(where: { author: $id }, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          link
          postId
          date
          slug
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
