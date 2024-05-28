"use client"
import { useMutation } from "@apollo/client"
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material"
import React, { FormEvent, useContext, useState } from "react"
import { EmailAddressInput } from "expanse.ui/form"
// import validate from 'validate.js'
import {
  ExpanseValidator,
  FORGOT_PASSWORD_VALIDATION_CONSTRAINTS,
} from "expanse.common"
import { LayoutContext } from "expanse.ui/application"
import { SUBMIT_FORGOT_PASSWORD } from "../../gql/submit-forgot-password"
import { AuthFormSubmitActions } from "../AuthFormSubmitActions"
import { AuthDisplayContext, AuthFormScreen, AuthFormsContext } from "../.."
import { useForgotPassword } from "../../hooks/useForgotPassword"

export function ForgotPassword() {
  const { handleForgotPasswordResponse } = useForgotPassword()
  const { email, setEmail } = useContext(AuthFormsContext)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const { setCurrentScreen } = useContext(AuthDisplayContext)

  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({
    email: [],
  })
  const {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
    showSnackbarError,
  } = useContext(LayoutContext)

  const requestID = "forgot-password"
  const [submitForm, { data, loading, error }] = useMutation(
    SUBMIT_FORGOT_PASSWORD,
  )

  if (loading) {
    if (!currentLoadingProcessIDs.includes(requestID) && loading) {
      addLoadingProcessID(requestID)
    } else if (currentLoadingProcessIDs.includes(requestID) && !loading) {
      removeLoadingProcessID(requestID)
    }
  }

  const formIsValid = async () => {
    const validationResults = await ExpanseValidator(
      {
        email,
      },
      FORGOT_PASSWORD_VALIDATION_CONSTRAINTS,
    )

    const fieldsWithErrors =
      validationResults && Object.keys(validationResults).length
        ? Object.keys(validationResults)
        : []
    if (fieldsWithErrors.length > 0) {
      setFormErrors(validationResults)
      return false
    }
    return true
  }

  const handleOnSubmit = async () => {
    setSubmitDisabled(true)
    const valid = (await formIsValid()) === true
    if (valid) {
      const response: any = await submitForm({
        variables: {
          email,
        },
      }).catch(handleForgotPasswordResponse)

      if (response) {
        handleForgotPasswordResponse(response)
      }
      setSubmitDisabled(false)
      setCurrentScreen(AuthFormScreen.VerifyResetPasscode)
    } else {
      setSubmitDisabled(true)
    }
  }

  const handleEmailChange = (val: string) => {
    setEmail(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, email: [] })
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box mb={6}>
          <Typography variant="body2" textAlign="center">
            Easy Fix. We&apos;ll send you reset instructions!
          </Typography>
        </Box>
        <Box mb={4} width="100%">
          <EmailAddressInput
            onChange={handleEmailChange}
            value={email}
            autofocus={false}
            placeholder="support@expanseservices.com"
            error={!!(formErrors.email && formErrors.email.length > 0)}
            helperText={
              formErrors.email && formErrors.email.length > 0
                ? formErrors.email[0]
                : null
            }
          />
        </Box>
      </Box>
      {/* Form side action row */}
      <AuthFormSubmitActions
        submitDisabled={submitDisabled}
        loading={loading}
        handleOnSubmit={handleOnSubmit}
        submitText="Reset Password"
      />
    </Box>
  )
}
