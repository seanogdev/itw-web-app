import gql from 'graphql-tag';

export default gql`
  query getCurrentUser {
    currentUser: viewer {
      ...UserFields
      avatar {
        url
      }
    }
  }
`;
