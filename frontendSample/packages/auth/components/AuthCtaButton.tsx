"use client"
import React, { useContext, useRef } from "react"
import { Box, Button, useTheme } from "@mui/material"
// import gsap from 'gsap'
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"

import { UserContext } from "../../user"
import { AuthDisplayContext } from ".."
import { ExpanseAnalyticsEvent } from "../../application/types"
import { AnalyticsContext } from "../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"

// Animation Opportunity Available

export type AuthCTAButtonProps = {
  authDisplayType?: "signIn" | "signUp"
  customText?: string
  eventName: ExpanseAnalyticsEvent
}
export function AuthCTAButton({
  authDisplayType = "signUp",
  customText,
  eventName,
}: AuthCTAButtonProps) {
  const containerRef = useRef()
  // todo, add a simple interactive animation to cta button
  // const AnimationTimeline = gsap.timeline()
  // const AnimationTimelineRef = useRef(AnimationTimeline)
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const { handleAuthNavigation } = useContext(AuthDisplayContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const signUpText = "Sign Up"
  const signInText = "Sign In"
  const defaultText = signUpText

  const text =
    customText ||
    (user && user.id
      ? "My Account"
      : authDisplayType
        ? authDisplayType === "signIn"
          ? signInText
          : authDisplayType === "signUp"
            ? signUpText
            : defaultText
        : defaultText)

  const onClickHandler = () => {
    handleAuthNavigation(authDisplayType)
    registerAnalyticsEvent({
      variables: {
        event: eventName,
        ...analyticsEventContext,
        params: JSON.stringify({ type: authDisplayType }),
      },
    })
  }

  return (
    <Box ref={containerRef}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "primary",
          "&:hover": {
            background: theme.palette.primary.highSaturation,
          },
        }}
        onClick={onClickHandler}
        endIcon={<PowerSettingsNewIcon fontSize="medium" />}
      >
        {text}
      </Button>
    </Box>
  )
}
