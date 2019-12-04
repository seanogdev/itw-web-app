import gql from 'graphql-tag';
import CategoryFields from './CategoryFields';

export default gql`
  fragment PostFields on Post {
    date
    slug
    internalLink @client
    postId
    title
    likes
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
          ...CategoryFields
        }
      }
    }
  }
  ${CategoryFields}
`;
