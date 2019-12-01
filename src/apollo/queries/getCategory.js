import gql from 'graphql-tag';

export default gql`
  query getCategory($slug: String!) {
    categories(where: { slug: [$slug] }) {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`;
