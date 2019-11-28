export const GET_POSTS_QUERY = (gql) => gql`
  query getPosts ($searchString: String) {
    posts ( where: { search: $searchString } ) {
      edges {
        # aliasing to post
        post: node {
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


export const GET_POST_BY_SLUG = (gql) => gql`
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
