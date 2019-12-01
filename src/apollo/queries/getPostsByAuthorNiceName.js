import gql from 'graphql-tag';
import PostFields from '../fragments/PostFields';

export default gql`
  query getPostsByAuthorNiceName($nicename: String!, $first: Int, $after: String) {
    posts(where: { authorName: $nicename }, first: $first, after: $after) {
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
