import gql from 'graphql-tag';

export default gql`
  mutation createComment($message: String!, $userId: Int!, $parentCommentId: ID, $postId: Int!) {
    createComment(
      input: {
        clientMutationId: "CreateComment"
        content: $message
        userId: $userId
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
