import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUser {
    user {
      id
      email
      firstName
      lastName
      stripeCustomerId
    }
  }
`;
