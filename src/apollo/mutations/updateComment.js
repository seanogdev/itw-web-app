import gql from 'graphql-tag';
import CommentFields from '@/apollo/fragments/CommentFields';

export default gql`
  mutation updateComment($message: String!, $id: ID!, $clientMutationId: String!) {
    updateComment(input: { clientMutationId: $clientMutationId, content: $message, id: $id }) {
      clientMutationId
      success
      comment {
        ...CommentFields
      }
    }
  }
  ${CommentFields}
`;
