import gql from 'graphql-tag';

export default gql`
  extend type Post {
    internalLink: String
  }
`;
