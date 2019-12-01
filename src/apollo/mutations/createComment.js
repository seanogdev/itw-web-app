import gql from 'graphql-tag';

export default gql`
  mutation createComment(
    $message: String!
    $parentCommentId: ID
    $postId: Int!
    $clientMutationId: String!
    $userId: Int!
  ) {
    createComment(
      input: {
        clientMutationId: $clientMutationId
        content: $message
        parent: $parentCommentId
        commentOn: $postId
        userId: $userId
      }
    ) {
      clientMutationId
      success
      comment {
        id
        commentId
        content
        date
        replies: children {
          nodes {
            id
          }
        }
        author {
          ... on User {
            userId
            name
            firstName
            lastName
            avatar(size: 100) {
              url
            }
          }
          ... on CommentAuthor {
            name
            id
          }
        }
      }
    }
  }
`;
