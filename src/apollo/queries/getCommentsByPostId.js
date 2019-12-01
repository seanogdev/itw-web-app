import gql from 'graphql-tag';
import CommentFields from '../fragments/CommentFields';

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
  ${CommentFields}
`;
