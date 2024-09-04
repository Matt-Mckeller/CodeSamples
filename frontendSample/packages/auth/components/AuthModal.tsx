"use client"
import { Dialog, DialogTitle, Box, Typography, Link } from "@mui/material"

import React, { useContext } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { SignUpForm } from "./screens/sign-up-form"
import { AuthFormScreen } from "../types"
import { AuthSuccessScreen } from "./screens/auth-success"
import { SignInForm } from "./screens/sign-in-form"
import { ForgotPassword } from "./screens/forgot-password"
import { VerifyResetPasswordPasscode } from "./screens/verify-reset-passcode"
import { ResetPassword } from "./screens/reset-password"
import { AuthDisplayContext } from ".."
import { AnalyticsContext } from "../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import { CloseModalButton } from "expanse.ui/theme"

export function AuthModal() {
  const {
    authModalIsOpen,
    modalTitle,
    exitAuth,
    currentScreen,
    setCurrentScreen,
  } = useContext(AuthDisplayContext)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  const handleClose = (event?: any, reason?: string) => {
    if (reason === "backdropClick") {
      // Do nothing
    } else {
      exitAuth()
      registerAnalyticsEvent({
        variables: {
          event: "exit-auth",
          analyticsEventContext,
          params: JSON.stringify({
            location: "modalExit",
            cancelFromScreen: currentScreen,
          }),
        },
      })
    }
  }

  return (
    <Dialog onClose={handleClose} open={authModalIsOpen}>
      <DialogTitle id="contact-dialog-title">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          width="100%"
          height="100%"
          position="relative"
        >
          <Box textAlign="center">
            <Typography component="h3">{modalTitle()}</Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: -7,
            }}
          >
            <CloseModalButton handleClose={handleClose} />
          </Box>
        </Box>
      </DialogTitle>
      <Box
        overflow="scroll"
        sx={{
          paddingLeft: 8,
          paddingRight: 8,
          width: "483.7px",
        }}
      >
        <Box>
          {currentScreen === AuthFormScreen.SignUp && <SignUpForm />}
          {currentScreen === AuthFormScreen.SignIn && <SignInForm />}
          {currentScreen === AuthFormScreen.ForgotPassword && (
            <ForgotPassword />
          )}
          {currentScreen === AuthFormScreen.VerifyResetPasscode && (
            <VerifyResetPasswordPasscode />
          )}
          {currentScreen === AuthFormScreen.ResetPassword && <ResetPassword />}
          {(currentScreen === AuthFormScreen.SignUpSuccess ||
            currentScreen === AuthFormScreen.ResetPasswordSuccess) && (
            <AuthSuccessScreen />
          )}
        </Box>
        <Box
          width="100%"
          mt={4}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          paddingBottom={8}
        >
          {/* // todo wording on already registered */}
          {currentScreen === AuthFormScreen.SignUp && (
            <Link
              component="button"
              onClick={() => setCurrentScreen(AuthFormScreen.SignIn)}
            >
              Already Registered? Sign In
            </Link>
          )}
          {currentScreen === AuthFormScreen.SignIn && (
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="space-between"
              flexDirection="row"
            >
              <Link
                component="button"
                onClick={() => setCurrentScreen(AuthFormScreen.SignUp)}
              >
                Create Account
              </Link>
              <Link
                component="button"
                onClick={() => setCurrentScreen(AuthFormScreen.ForgotPassword)}
              >
                Reset Password
              </Link>
            </Box>
          )}
          {[
            AuthFormScreen.ForgotPassword,
            AuthFormScreen.ResetPassword,
            AuthFormScreen.VerifyResetPasscode,
          ].includes(currentScreen) && (
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="space-between"
              flexDirection="row"
            >
              <Link
                component="button"
                onClick={() => setCurrentScreen(AuthFormScreen.SignUp)}
              >
                Create Account
              </Link>
              <Link
                component="button"
                onClick={() => setCurrentScreen(AuthFormScreen.SignIn)}
              >
                Sign In
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}
