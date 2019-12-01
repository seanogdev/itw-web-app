import gql from 'graphql-tag';
import UserFields from '../fragments/UserFields';

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
        name
        id
      }
      ... on User {
        ...UserFields
        avatar(size: 100) {
          url
        }
      }
    }
  }
  ${UserFields}
`;
