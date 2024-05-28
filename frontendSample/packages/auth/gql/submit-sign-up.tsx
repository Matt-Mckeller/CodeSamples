import { gql } from "@apollo/client";

// Backend will save user agent and timestamp
export const SUBMIT_SIGN_UP = gql`
  mutation signUp(
    $fullName: String!
    $email: String!
    $password: String!
    $agreeToPrivacyPolicy: Boolean!
    $agreeToTermsOfService: Boolean!
  ) {
    signUp(
      input: {
        fullName: $fullName
        email: $email
        password: $password
        agreeToPrivacyPolicy: $agreeToPrivacyPolicy
        agreeToTermsOfService: $agreeToTermsOfService
      }
    ) {
      success
      jwt
    }
  }
`;
