import gql from 'graphql-tag';

export default gql`
  query getUsers {
    users(first:999, where: { orderby: { field:NICE_NAME}}) {
      edges {
        node {
          name
          userId
        }
      }
    }
  }
`;
