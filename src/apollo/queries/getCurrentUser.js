import gql from 'graphql-tag';

export default gql`
  query getCurrentUser {
    currentUser: viewer {
      id
      userId
      firstName
      lastName
    }
  }
`;
