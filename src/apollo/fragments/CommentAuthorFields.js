import gql from 'graphql-tag';

export default gql`
  fragment CommentAuthorFields on CommentAuthor {
    id
    name
    fullName @client
  }
`;
