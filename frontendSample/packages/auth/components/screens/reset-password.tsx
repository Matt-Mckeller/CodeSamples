"use client"
import { useMutation } from "@apollo/client"
import { Box, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { PasswordInput } from "expanse.ui/form"
import {
  ExpanseValidator,
  RESET_PASSWORD_VALIDATION_CONSTRAINTS,
} from "expanse.common"
import { LayoutContext } from "expanse.ui/application"
import { SUBMIT_RESET_PASSWORD } from "../../gql/submit-reset-password"
import { AuthFormSubmitActions } from "../AuthFormSubmitActions"
import { AuthDisplayContext, AuthFormScreen, useForgotPassword } from "../.."
import { AuthFormsContext } from "../../context/AuthForms.context"

export function ResetPassword() {
  const { email, password, setPassword, resetPasscode } =
    useContext(AuthFormsContext)
  const { handleResetPasswordResponse } = useForgotPassword()
  const { setCurrentScreen } = useContext(AuthDisplayContext)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({
    password: [],
  })
  const {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
  } = useContext(LayoutContext)

  const requestID = "reset-password"
  const [submitForm, { data, loading, error }] = useMutation(
    SUBMIT_RESET_PASSWORD,
  )

  if (loading) {
    if (currentLoadingProcessIDs.includes(requestID) && loading) {
      addLoadingProcessID(requestID)
    } else if (currentLoadingProcessIDs.includes(requestID) && !loading) {
      removeLoadingProcessID(requestID)
    }
  }

  const formIsValid = async () => {
    const validationResults = await ExpanseValidator(
      {
        email,
        resetPasscode,
        password,
      },
      RESET_PASSWORD_VALIDATION_CONSTRAINTS,
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
          resetPasscode,
          password,
        },
      }).catch(handleResetPasswordResponse)

      if (response) {
        handleResetPasswordResponse(response)
      }
      setSubmitDisabled(false)
      setCurrentScreen(AuthFormScreen.ResetPasswordSuccess)
    } else {
      setSubmitDisabled(true)
    }
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, password: [] })
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
          <Typography variant="body2">Enter your new password.</Typography>
        </Box>
        <Box mb={4} width="100%">
          <PasswordInput
            onChange={handlePasswordChange}
            value={password}
            error={!!(formErrors.password && formErrors.password.length > 0)}
            helperText={
              formErrors.password && formErrors.password.length > 0
                ? formErrors.password[0]
                : null
            }
            displayRequirements
            autoComplete="new-password"
          />
        </Box>
      </Box>
      {/* Form side action row */}
      <AuthFormSubmitActions
        submitDisabled={submitDisabled}
        loading={loading}
        handleOnSubmit={handleOnSubmit}
        submitText="Update Password"
      />
    </Box>
  )
}
