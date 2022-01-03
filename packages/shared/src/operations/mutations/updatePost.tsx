import { gql } from '@apollo/client';

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $attributes: PostAttributes!) {
    updatePost(id: $id, attributes: $attributes) {
      post {
        id
        title
      }
    }
  }
`;
