import { gql } from "@apollo/client";

// Backend will save user agent and timestamp
export const SUBMIT_RESET_PASSWORD = gql`
  mutation resetPassword(
    $email: String!
    $resetPasscode: String!
    $password: String!
  ) {
    resetPassword(
      input: {
        email: $email
        resetPasscode: $resetPasscode
        password: $password
      }
    ) {
      success
      jwt
    }
  }
`;
