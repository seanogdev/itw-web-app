import gql from 'graphql-tag';
import CategoryFields from '../fragments/CategoryFields';

export default gql`
  query getCategory($slug: String!) {
    categories(where: { slug: [$slug] }) {
      edges {
        node {
          ...CategoryFields
        }
      }
    }
  }
  ${CategoryFields}
`;
