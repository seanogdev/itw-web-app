import gql from 'graphql-tag';

export default gql`
  query getCategories {
    categories(first:999, where: { orderby: NAME }) {
      edges {
        node {
          slug,
          name
        }
      }
    }
  }
`;
