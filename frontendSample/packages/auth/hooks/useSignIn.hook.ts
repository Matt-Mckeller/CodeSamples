import { useContext } from "react"
import { ValidationContent, getDisplayErrorMessage } from "expanse.common"
import { useAuthDefaultApiHandlers } from "./useAuthDefaultApiHandlers"

import { AuthContent } from "../config/AuthContent"
import { AuthDisplayContext } from "../context/AuthDisplay.context"
import { AuthSessionContext } from ".."
import { useMutation } from "@apollo/client"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { AnalyticsContext, LayoutContext } from "../../application"

export interface SignInHandlers {
  handleSignInResponse: (response: any) => boolean
}

export function useSignIn(): SignInHandlers {
  const { onSuccessResponse, onErrorResponse } = useAuthDefaultApiHandlers()
  const { exitAuth } = useContext(AuthDisplayContext)
  const { handleSuccessfulLogin } = useContext(AuthSessionContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const { showSnackbarSuccess } = useContext(LayoutContext)

  const handleSignInResponse = (response: any) => {
    if (response && response?.data?.signIn && response?.data?.signIn?.jwt) {
      const user = handleSuccessfulLogin(response.data.signIn.jwt)
      registerAnalyticsEvent({
        variables: {
          event: "successful-login",
          ...analyticsEventContext,
          params: null,
        },
      })
      console.log({ user })
      showSnackbarSuccess(AuthContent.successMessages.signIn(user))
      exitAuth()
      registerAnalyticsEvent({
        variables: {
          event: "exit-auth",
          analyticsEventContext,
          params: JSON.stringify({
            location: "loginSuccess",
          }),
        },
      })
      onSuccessResponse()
      return true
    }
    // todo cleanup error messages
    console.log({
      errorMessageRetrieved: getDisplayErrorMessage(
        response,
        ValidationContent["en"].featureErrors.signIn,
      ),
    })
    onErrorResponse(
      getDisplayErrorMessage(
        response,
        ValidationContent["en"].featureErrors.signIn,
      ),
    )
    return false
  }
  return {
    handleSignInResponse,
  }
}
