import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($page: Int, $query: String!) {
    users(page: $page, query: $query) {
      collection {
        id
        email
        name
        role
      }
      metadata {
        totalPages
        totalCount
        currentPage
        limitValue
      }
    }
  }
`;
