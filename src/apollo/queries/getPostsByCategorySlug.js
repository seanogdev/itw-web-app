import gql from 'graphql-tag';
import PostFields from '@/apollo/fragments/PostFields';

export default gql`
  query getPostsByCategorySlug($slug: String!, $first: Int, $after: String) {
    posts(where: { categoryName: $slug }, first: $first, after: $after) {
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
