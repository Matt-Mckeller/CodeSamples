import { gql } from "@apollo/client";

// Backend will save user agent and timestamp
export const SUBMIT_FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(input: { email: $email }) {
      success
    }
  }
`;
