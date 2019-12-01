import gql from 'graphql-tag';
import CategoryFields from '../fragments/CategoryFields';

export default gql`
  query getCategories {
    categories(first: 999, where: { orderby: NAME }) {
      edges {
        node {
          ...CategoryFields
        }
      }
    }
  }
  ${CategoryFields}
`;
