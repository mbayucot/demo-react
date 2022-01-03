import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($page: Int, $query: String, $tag: String, $sort: String) {
    posts(page: $page, query: $query, tag: $tag, sort: $sort) {
      collection {
        id
        title
        body
        slug
        tags {
          id
          name
        }
        updatedAt
        user {
          id
          firstName
          lastName
        }
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
