import gql from 'graphql-tag';

export default gql`
  extend type User {
    internalLink: String
    fullName: String!
  }
`;
