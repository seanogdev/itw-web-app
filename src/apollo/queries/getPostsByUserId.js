import gql from 'graphql-tag';
import PostFields from '../fragments/PostFields';

export default gql`
  query getPostsByUserId($userId: Int!, $first: Int, $after: String) {
    posts(where: { author: $userId }, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
  ${PostFields}
`;
