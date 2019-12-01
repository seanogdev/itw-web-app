import gql from 'graphql-tag';
import UserFields from '../fragments/UserFields';
import CommentAuthorFields from '../fragments/CommentAuthorFields';

export default gql`
  query getCommentsByPostId($postId: ID!) {
    comments(where: { contentId: $postId, orderby: COMMENT_DATE, order: ASC }, first: 999) {
      nodes {
        ...CommentFields
        replies: children {
          nodes {
            ...CommentFields
            replies: children {
              nodes {
                ...CommentFields
                replies: children {
                  nodes {
                    ...CommentFields
                    replies: children {
                      nodes {
                        ...CommentFields
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

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
