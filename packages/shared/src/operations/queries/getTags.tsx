import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query GetTags($query: String!) {
    tags(query: $query) {
      id
      name
    }
  }
`;
