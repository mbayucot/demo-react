import { gql } from '@apollo/client';

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($token: String!) {
    createSubscription(token: $token) {
      user {
        id
      }
    }
  }
`;
