import gql from 'graphql-tag';

export default gql`
  mutation deleteComment($clientMutationId: String!, $commentId: ID!) {
    deleteComment(input: { id: $commentId, clientMutationId: $clientMutationId }) {
      deletedId
      clientMutationId
      comment {
        commentId
      }
    }
  }
`;
