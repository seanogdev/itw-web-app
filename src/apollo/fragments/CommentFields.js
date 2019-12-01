import gql from 'graphql-tag';
import CommentAuthorFields from './CommentAuthorFields';
import UserFields from './UserFields';

export default gql`
  fragment CommentFields on Comment {
    id
    commentId
    date
    content
    author {
      ... on CommentAuthor {
        ...CommentAuthorFields
      }
      ... on User {
        ...UserFields
        avatar(size: 100) {
          url
        }
      }
    }
  }
  ${CommentAuthorFields}
  ${UserFields}
`;
