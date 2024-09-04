import { useContext } from "react"
import { getDisplayErrorMessage, ValidationContent } from "expanse.common"
import { useAuthDefaultApiHandlers as useAuthDefaultRequestAndResponseHandlers } from "./useAuthDefaultApiHandlers"
import { AuthDisplayContext } from "../context/AuthDisplay.context"
import { AuthContent } from "../config/AuthContent"
import { AuthSessionContext } from "../context/AuthSession.context"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import { AnalyticsContext, LayoutContext } from "../../application"

export interface SignUpHandlers {
  handleSignUpResponse: (response: any) => boolean
}

export function useSignUp(): SignUpHandlers {
  const { exitAuth } = useContext(AuthDisplayContext)
  const { onErrorResponse } = useAuthDefaultRequestAndResponseHandlers()
  const { handleSuccessfulLogin } = useContext(AuthSessionContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const { showSnackbarSuccess } = useContext(LayoutContext)

  const handleSignUpResponse = (response: any) => {
    if (response && response?.data?.signUp && response?.data?.signUp?.jwt) {
      exitAuth()
      registerAnalyticsEvent({
        variables: {
          event: "exit-auth",
          ...analyticsEventContext,
          params: JSON.stringify({
            location: "loginSuccess",
          }),
        },
      })
      showSnackbarSuccess(AuthContent.successMessages.signUp())
      handleSuccessfulLogin(response.data.signUp.jwt)
      registerAnalyticsEvent({
        variables: {
          event: "successful-sign-up",
          ...analyticsEventContext,
          params: null,
        },
      })
      return true
    }
    onErrorResponse(
      getDisplayErrorMessage(
        response,
        ValidationContent["en"].responseErrors.signUp,
      ),
    )
    return false
  }

  return {
    handleSignUpResponse,
  }
}
