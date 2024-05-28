"use client"

import { useMutation } from "@apollo/client"
import { Box, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { EmailAddressInput, PasswordInput } from "expanse.ui/form"
// import validate from 'validate.js'
import {
  ExpanseValidator,
  SIGN_IN_VALIDATION_CONSTRAINTS,
} from "expanse.common"
import { LayoutContext } from "expanse.ui/application"
import { SUBMIT_SIGN_IN } from "../../gql/submit-sign-in"
import { AuthFormSubmitActions } from "../AuthFormSubmitActions"
import { useSignIn } from "../../hooks/useSignIn.hook"
import { AuthFormsContext } from "../../context/AuthForms.context"
import { useRouter } from "next/navigation"

export function SignInForm() {
  const { email, setEmail, password, setPassword } =
    useContext(AuthFormsContext)
  const { handleSignInResponse } = useSignIn()
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({
    email: [],
    password: [],
  })

  const requestID = "sign-in"
  const [submitSignIn, { data, loading, error }] = useMutation(SUBMIT_SIGN_IN)
  const {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
  } = useContext(LayoutContext)
  const router = useRouter()

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
        password,
      },
      SIGN_IN_VALIDATION_CONSTRAINTS,
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
      const response: any = await submitSignIn({
        variables: {
          password,
          email,
        },
      }).catch(handleSignInResponse)

      if (response) {
        handleSignInResponse(response)
        router.push("/")
      }

      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
  }

  const handleEmailChange = (val: string) => {
    setEmail(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, email: [] })
  }
  const handlePasswordChange = (val: string) => {
    setPassword(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, password: [] })
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <Box
        mb={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="body2">Welcome Back!</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box mb={4} width="100%">
          <EmailAddressInput
            onChange={handleEmailChange}
            value={email}
            autoFocus
            error={!!(formErrors.email && formErrors.email.length > 0)}
            helperText={
              formErrors.email && formErrors.email.length > 0
                ? formErrors.email[0]
                : null
            }
          />
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
            displayRequirements={false}
            autoComplete="current-password"
          />
        </Box>
      </Box>
      <AuthFormSubmitActions
        submitDisabled={submitDisabled}
        loading={loading}
        handleOnSubmit={handleOnSubmit}
        submitText="Sign In"
      />
    </Box>
  )
}
