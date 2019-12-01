import gql from 'graphql-tag';

export default gql`
  query getUser($id: Int!) {
    users(where: { include: [$id] }) {
      edges {
        node {
          name
          firstName
          lastName
        }
      }
    }
  }
`;
