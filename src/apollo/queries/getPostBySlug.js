import gql from 'graphql-tag';
import CategoryFields from '@/apollo/fragments/CategoryFields';
import UserFields from '@/apollo/fragments/UserFields';

export default gql`
  query getPostBySlug($slug: String!) {
    post: postBy(slug: $slug) {
      link
      internalLink @client
      postId
      title
      date
      content
      author {
        ...UserFields
        avatar(size: 100) {
          url
        }
      }
      featuredImage {
        altText
        sourceUrl
        srcSet
        sizes
      }
      categories {
        edges {
          node {
            ...CategoryFields
          }
        }
      }
    }
  }
  ${CategoryFields}
  ${UserFields}
`;
