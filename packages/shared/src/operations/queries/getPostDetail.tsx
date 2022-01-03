import { gql } from '@apollo/client';

export const GET_POST_DETAIL = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      slug
      subscribed
      tags {
        id
        name
      }
      comments {
        id
        body
        postId
        ancestry
        children {
          id
          body
          postId
          ancestry
        }
      }
    }
  }
`;
