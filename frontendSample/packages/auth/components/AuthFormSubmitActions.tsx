"use client"
import { Button } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import React, { FormEvent, useContext } from "react"

import { AuthDisplayContext } from ".."
import { useMutation } from "@apollo/client"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { AnalyticsContext } from "../../application"

type AuthFormSubmitActionsProps = {
  submitDisabled: boolean
  loading: boolean
  handleOnSubmit: (e?: FormEvent) => void
  submitText: string
}
export function AuthFormSubmitActions({
  submitDisabled,
  loading,
  handleOnSubmit,
  submitText,
}: AuthFormSubmitActionsProps) {
  // Submit Section of Auth Forms
  const { exitAuth, currentScreen } = useContext(AuthDisplayContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const theme = useTheme()
  const onClickHandler = (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (!submitDisabled) {
      registerAnalyticsEvent({
        variables: {
          event: "clicked-auth-form-submit",
          ...analyticsEventContext,
          params: JSON.stringify({ value: `screen:${currentScreen}` }),
        },
      })
      handleOnSubmit()
    } else {
      console.log("Submit was disabled, click event ignored.")
    }
  }
  return (
    <Box display="flex" gap={2}>
      <Button
        fullWidth
        variant="outlined"
        onClick={exitAuth}
        sx={{
          color: "text.primary",
          opacity: "20%",
          "&:hover": { opacity: "100%" },
        }}
      >
        Cancel
      </Button>

      <Button
        fullWidth
        type="submit"
        disabled={submitDisabled || loading}
        variant="contained"
        onClick={onClickHandler}
        color="primary"
        sx={{
          whiteSpace: "nowrap",
          backgroundColor: theme.palette.primary,
          "&:hover": {
            background: theme.palette.primary.highSaturation,
          },
        }}
      >
        {submitText}
      </Button>
    </Box>
  )
}
