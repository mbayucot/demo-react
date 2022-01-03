import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!, $parentId: ID) {
    createComment(postId: $postId, body: $body, parentId: $parentId) {
      comment {
        id
        body
        ancestry
        children {
          id
          body
          ancestry
        }
      }
    }
  }
`;
