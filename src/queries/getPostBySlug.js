import gql from 'graphql-tag';

export default gql`
  query getPostBySlug($slug: String!) {
    post: postBy(slug: $slug) {
      link
      postId
      title
      date
      content
      featuredImage {
        altText
        sourceUrl
        srcSet
        sizes
      }
      categories {
        edges {
          node {
            link
            name
          }
        }
      }
      comments(first: 999, where: { orderby: COMMENT_DATE, order: ASC }) {
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
  }

fragment CommentFields on Comment {
    id
    date
    type
    approved
    content
}
`;
