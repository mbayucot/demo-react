import { gql } from '@apollo/client';

export const DELETE_POST = gql`
  mutation destroyPost($id: ID!) {
    destroyPost(id: $id) {
      post {
        id
        title
      }
    }
  }
`;
