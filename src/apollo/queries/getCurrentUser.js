import gql from 'graphql-tag';
import UserFields from '../fragments/UserFields';

export default gql`
  query getCurrentUser {
    currentUser: viewer {
      ...UserFields
      avatar(size: 100) {
        url
      }
    }
  }
  ${UserFields}
`;
