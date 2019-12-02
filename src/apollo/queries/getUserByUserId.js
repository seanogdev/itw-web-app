import gql from 'graphql-tag';
import UserFields from '../fragments/UserFields';

export default gql`
  query getUserByUserId($userId: Int!) {
    users(where: { include: [$userId] }) {
      edges {
        node {
          ...UserFields
        }
      }
    }
  }
  ${UserFields}
`;
