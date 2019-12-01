import gql from 'graphql-tag';

export default gql`
  fragment UserFieldsShort on User {
    id
    userId
    name
    internalLink @client
    fullName @client
    nicename
    firstName
    lastName
  }
`;
