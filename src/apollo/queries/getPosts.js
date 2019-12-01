import gql from 'graphql-tag';
import PostFields from '../fragments/PostFields';

export default gql`
  query getPosts($searchString: String, $first: Int, $after: String) {
    posts(where: { search: $searchString }, first: $first, after: $after) {
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
