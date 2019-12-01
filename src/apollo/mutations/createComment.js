import gql from 'graphql-tag';
import CommentFields from '@/apollo/fragments/CommentFields';

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
        ...CommentFields
        replies: children {
          nodes {
            id
          }
        }
      }
    }
  }
  ${CommentFields}
`;
