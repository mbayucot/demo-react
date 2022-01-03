import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $firstName: String!, $lastName: String!, $password: String!, $role: String!) {
    createUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password, role: $role) {
      user {
        id
        email
      }
    }
  }
`;
