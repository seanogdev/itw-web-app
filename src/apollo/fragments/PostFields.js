import gql from 'graphql-tag';
import CategoryFields from './CategoryFields';

export default gql`
  fragment PostFields on Post {
    link
    internalLink @client
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
          ...CategoryFields
        }
      }
    }
  }
  ${CategoryFields}
`;
