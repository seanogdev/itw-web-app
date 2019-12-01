import gql from 'graphql-tag';

export default gql`
  fragment UserFieldsShort on User {
    id
    userId
    name
    internalLink @client
    nicename
    firstName
    lastName
  }
`;
