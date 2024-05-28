"use client"
import React, { useContext } from "react"
import { Typography, Button } from "@mui/material"
import { Box } from "@mui/system"
import { AuthFormScreen } from "../../types"

import { AuthDisplayContext } from "expanse.ui/auth"
import { UserContext } from "expanse.ui/user"
import { AnalyticsContext } from "../../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../../application/gql"
import { useMutation } from "@apollo/client"

export function AuthSuccessScreen() {
  const { exitAuth, currentScreen } = useContext(AuthDisplayContext)
  const { user } = useContext(UserContext)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" px={1}>
      <Box textAlign="left">
        <Typography variant="body1">
          {currentScreen === AuthFormScreen.SignUpSuccess &&
            "Your sign-up is complete. Let the games begin!"}
          {currentScreen === AuthFormScreen.ResetPasswordSuccess &&
            `Welcome back${user && user.fullName ? ` ${user.fullName}` : ""}! Your password has been reset successfully. Enjoy your stay.`}
          {/* {currentScreen === AuthFormScreen.SignInSuccess &&
            `Welcome back${user && user.fullName ? ` ${user.fullName}` : ""}!`} */}
        </Typography>
      </Box>
      <Box mt={4} textAlign="center" display="flex" justifyContent="center">
        <Box width="100%">
          <Button
            fullWidth
            type="submit"
            variant="contained"
            onClick={() => {
              registerAnalyticsEvent({
                variables: {
                  event: "exit-auth",
                  ...analyticsEventContext,
                  params: JSON.stringify({
                    location: "auth-success",
                  }),
                },
              })
              exitAuth()
            }}
            color="primary"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
