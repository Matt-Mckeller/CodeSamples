import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      firstName
      lastName
      phone
      email
    }
  }
`;
