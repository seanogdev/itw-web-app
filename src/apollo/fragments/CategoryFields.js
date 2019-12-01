import gql from 'graphql-tag';

export default gql`
  fragment CategoryFields on Category {
    slug
    internalLink @client
    name
  }
`;
