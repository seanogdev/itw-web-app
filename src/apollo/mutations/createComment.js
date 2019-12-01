import gql from 'graphql-tag';

export default gql`
  mutation createComment(
    $message: String!
    $parentCommentId: ID
    $postId: Int!
    $clientMutationId: String!
  ) {
    createComment(
      input: {
        clientMutationId: $clientMutationId
        content: $message
        parent: $parentCommentId
        commentOn: $postId
      }
    ) {
      success
      comment {
        id
        commentId
        content
        author {
          ... on User {
            userId
            name
          }
          ... on CommentAuthor {
            name
          }
        }
      }
    }
  }
`;
