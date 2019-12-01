import gql from 'graphql-tag';
import UserFields from '@/apollo/fragments/UserFields';
import CommentAuthorFields from '@/apollo/fragments/CommentAuthorFields';

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
            ...UserFields
          }
          ... on CommentAuthor {
            ...CommentAuthorFields
          }
        }
      }
    }
  }
  ${UserFields}
  ${CommentAuthorFields}
`;
