import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation destroyUser($id: ID!) {
    destroyUser(id: $id) {
      user {
        id
        email
      }
    }
  }
`;
