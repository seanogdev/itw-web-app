import gql from 'graphql-tag';

export default gql`
  extend type CommentAuthor {
    fullName: String!
  }
`;
