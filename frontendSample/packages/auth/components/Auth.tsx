"use client"
import { Box, Typography, Link } from "@mui/material"

import React, { useContext } from "react"
import { SignUpForm } from "./screens/sign-up-form"
import { AuthFormScreen } from "../types"
import {
  AuthSuccessScreen,
  SignInForm,
  ForgotPassword,
  VerifyResetPasswordPasscode,
  ResetPassword,
} from "./screens"
import { AuthDisplayContext } from "../context"

export function Auth() {
  const { modalTitle, currentScreen, setCurrentScreen } =
    useContext(AuthDisplayContext)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Box id="page-title" textAlign="center" mt={6} mb={6}>
        <Typography variant="h2" component="h2">
          {modalTitle()}
        </Typography>
      </Box>
      <Box width="100%" maxWidth="510px">
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
    </Box>
  )
}
