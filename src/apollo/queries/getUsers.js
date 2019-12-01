import gql from 'graphql-tag';
import UserFieldsShort from '../fragments/UserFieldsShort';

export default gql`
  query getUsers {
    users(first: 999, where: { orderby: { field: NICE_NAME } }) {
      edges {
        node {
          ...UserFieldsShort
        }
      }
    }
  }
  ${UserFieldsShort}
`;
