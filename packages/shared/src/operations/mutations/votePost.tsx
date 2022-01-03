import { gql } from '@apollo/client';

export const VOTE_POST = gql`
  mutation votePost($id: ID!, $weight: Int!) {
    reactPost(id: $id, weight: $weight) {
      post {
        id
        title
      }
    }
  }
`;
