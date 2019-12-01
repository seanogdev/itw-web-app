import gql from 'graphql-tag';

export default gql`
  extend type Category {
    internalLink: String
  }
`;
