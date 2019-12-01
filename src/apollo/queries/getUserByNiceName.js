import gql from 'graphql-tag';
import UserFields from '../fragments/UserFields';

export default gql`
  query getUserByNiceName($nicename: String!) {
    users(where: { nicename: $nicename }) {
      edges {
        node {
          ...UserFields
        }
      }
    }
  }
  ${UserFields}
`;
