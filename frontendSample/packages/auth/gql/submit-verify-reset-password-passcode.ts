import { gql } from "@apollo/client";

// Backend will save user agent and timestamp
export const SUBMIT_VERIFY_RESET_PASSWORD_PASSCODE = gql`
  mutation verifyResetPasswordPasscode(
    $email: String!
    $resetPasscode: String!
  ) {
    verifyResetPasswordPasscode(
      input: { email: $email, resetPasscode: $resetPasscode }
    ) {
      success
    }
  }
`;
