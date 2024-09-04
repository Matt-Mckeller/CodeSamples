"use client"
import { useContext } from "react"
import { getDisplayErrorMessage, ValidationContent } from "expanse.common"
import { useAuthDefaultApiHandlers } from "./useAuthDefaultApiHandlers"
import { AuthFormsContext } from "../context/AuthForms.context"
import { AuthContent } from "../config/AuthContent"
import { AuthDisplayContext } from "../context/AuthDisplay.context"
import { AuthSessionContext } from "../context/AuthSession.context"
import { useMutation } from "@apollo/client"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { AnalyticsContext, LayoutContext } from "../../application"

export interface ForgotPasswordHandlers {
  handleForgotPasswordResponse: (response: any) => void
  handleVerifyPasscodeResponse: (response: any) => void
  handleResetPasswordResponse: (response: any) => true | false
}

export function useForgotPassword(): ForgotPasswordHandlers {
  const { onSuccessResponse, onErrorResponse } = useAuthDefaultApiHandlers()
  const { email } = useContext(AuthFormsContext)
  const { exitAuth } = useContext(AuthDisplayContext)
  const { handleSuccessfulLogin } = useContext(AuthSessionContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const { showSnackbarSuccess } = useContext(LayoutContext)

  const handleForgotPasswordResponse = (response: any) => {
    if (response && response?.data?.forgotPassword?.success) {
      registerAnalyticsEvent({
        variables: {
          event: "forgot-password-success",
          ...analyticsEventContext,
          params: JSON.stringify({
            email,
          }),
        },
      })
      onSuccessResponse()
      return true
    }
    onErrorResponse(
      getDisplayErrorMessage(
        response,
        ValidationContent["en"].responseErrors.forgotPassword,
      ),
    )
    return false
  }

  const handleVerifyPasscodeResponse = (response: any) => {
    if (response && response?.data?.verifyResetPasswordPasscode?.success) {
      registerAnalyticsEvent({
        variables: {
          event: "verify-passcode-password-success",
          ...analyticsEventContext,
          params: JSON.stringify({
            email,
          }),
        },
      })
      onSuccessResponse()
    } else {
      // Error handling in ui component
    }
  }

  const handleResetPasswordResponse = (response: any) => {
    if (response && response?.data?.resetPassword?.success) {
      console.log("Successfully reset user password!")

      registerAnalyticsEvent({
        variables: {
          event: "reset-password-success",
          ...analyticsEventContext,
          params: JSON.stringify({
            email,
          }),
        },
      })
      showSnackbarSuccess(AuthContent.successMessages.resetPassword())
      handleSuccessfulLogin(response?.data?.resetPassword?.jwt)
      registerAnalyticsEvent({
        variables: {
          event: "login-success",
          ...analyticsEventContext,
          params: JSON.stringify({
            email,
            type: "reset-password-login",
          }),
        },
      })
      onSuccessResponse()
      exitAuth()
      return true
    }
    onErrorResponse(
      getDisplayErrorMessage(
        response,
        ValidationContent["en"].responseErrors.resetPassword,
      ),
    )
    return false
  }

  return {
    handleForgotPasswordResponse,
    handleVerifyPasscodeResponse,
    handleResetPasswordResponse,
  }
}
