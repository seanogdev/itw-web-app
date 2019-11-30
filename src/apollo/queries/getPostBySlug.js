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
        avatar(size: 200) {
          url
        }
        description
        nickname
        userId
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
