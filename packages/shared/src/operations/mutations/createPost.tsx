import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!, $tagList: [String!]) {
    createPost(title: $title, body: $body, tagList: $tagList) {
      post {
        id
        title
      }
    }
  }
`;
