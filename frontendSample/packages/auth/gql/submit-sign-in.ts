import { gql } from "@apollo/client";

// Backend will save user agent and timestamp
export const SUBMIT_SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      success
      jwt
    }
  }
`;
