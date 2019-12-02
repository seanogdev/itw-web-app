import gql from 'graphql-tag';

export default gql`
  fragment UserFields on User {
    id
    userId
    capabilities
    name
    internalLink @client
    fullName @client
    nicename
    firstName
    lastName
  }
`;
