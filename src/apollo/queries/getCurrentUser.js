import gql from 'graphql-tag';

export default gql`
  query getCurrentUser {
    currentUser: viewer {
      id
      userId
      name
      firstName
      lastName
      avatar {
        url
      }
    }
  }
`;
