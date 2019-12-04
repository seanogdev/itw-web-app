import gql from 'graphql-tag';
import CategoryFields from '@/apollo/fragments/CategoryFields';
import UserFields from '@/apollo/fragments/UserFields';
import PostFields from '@/apollo/fragments/PostFields';

export default gql`
  query getPostBySlug($slug: String!) {
    post: postBy(slug: $slug) {
      ...PostFields
      content
      author {
        ...UserFields
        description
        avatar(size: 100) {
          url
        }
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
  ${PostFields}
  ${CategoryFields}
  ${UserFields}
`;
