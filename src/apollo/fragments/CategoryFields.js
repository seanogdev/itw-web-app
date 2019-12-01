import gql from 'graphql-tag';

export default gql`
  fragment CategoryFields on Category {
    link
    internalLink @client
    name
  }
`;
