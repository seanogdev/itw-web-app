import gql from 'graphql-tag';

export default gql`
  query getPostBySlug($slug: String!) {
    post: postBy(slug: $slug) {
      link
      postId
      title
      date
      content
      author {
        userId
        avatar(size: 200) {
          url
        }
        name
      }
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
