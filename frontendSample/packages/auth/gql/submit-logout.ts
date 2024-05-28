import { gql } from "@apollo/client";

// Backend will save user agent and timestamp
export const SUBMIT_LOGOUT = gql`
  mutation logout($jwt: String!) {
    logout(input: { jwt: $jwt }) {
      success
    }
  }
`;
