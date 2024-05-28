"use client"

import { useMutation } from "@apollo/client"
import { Box, Theme, useMediaQuery } from "@mui/material"
import React, { useContext, useState } from "react"
import {
  EmailAddressInput,
  PasswordInput,
  AgreeToPrivacyPolicyAndTermsInput,
  NameInput,
} from "expanse.ui/form"
import {
  ExpanseValidator,
  SIGN_UP_VALIDATION_CONSTRAINTS,
} from "expanse.common"
import { LayoutContext } from "expanse.ui/application"
import { SUBMIT_SIGN_UP } from "../../gql/submit-sign-up"
import { AuthFormSubmitActions } from "../AuthFormSubmitActions"
import { AuthDisplayContext, AuthFormScreen, useSignUp } from "../.."
import { AuthFormsContext } from "../../context/AuthForms.context"

export function SignUpForm() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    agreeToPrivacyPolicyAndTerms,
    setAgreeToPrivacyPolicyAndTerms,
  } = useContext(AuthFormsContext)
  const { setCurrentScreen } = useContext(AuthDisplayContext)
  const { handleSignUpResponse } = useSignUp()
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({
    email: [],
    password: [],
    fullName: [],
    agreeToPrivacyPolicyAndTerms: [],
  })
  const useDesktopView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("laptop"),
  )

  const requestID = "sign-up"
  const [submitSignUp, { data, loading, error }] = useMutation(SUBMIT_SIGN_UP)
  const {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
  } = useContext(LayoutContext)

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
        fullName,
        agreeToPrivacyPolicyAndTerms,
      },
      SIGN_UP_VALIDATION_CONSTRAINTS,
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
      const response: any = await submitSignUp({
        variables: {
          fullName,
          password,
          email,
          agreeToTermsOfService: agreeToPrivacyPolicyAndTerms,
          agreeToPrivacyPolicy: agreeToPrivacyPolicyAndTerms,
        },
      }).catch(handleSignUpResponse)

      if (response) {
        handleSignUpResponse(response)
        setCurrentScreen(AuthFormScreen.SignUpSuccess)
      }

      setSubmitDisabled(false)
    } else {
      console.log("Validation error on sign up form.")
      setSubmitDisabled(true)
    }
  }

  const onCheckedPrivacyPolicyAndTerms = (val: boolean) => {
    setAgreeToPrivacyPolicyAndTerms(val)
    // Clear privacy policy and terms error
    setFormErrors({ ...formErrors, agreeToPrivacyPolicyAndTerms: [] })

    if (val === true) {
      setSubmitDisabled(false)
    }
  }

  const handleFullNameChange = (val: string) => {
    setFullName(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, fullName: [] })
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={2}
      >
        <Box mb={4} width="100%">
          <NameInput
            autofocus
            onChange={handleFullNameChange}
            value={fullName}
            error={!!(formErrors.fullName && formErrors.fullName.length > 0)}
            helperText={
              formErrors.fullName && formErrors.fullName.length > 0
                ? formErrors.fullName[0]
                : null
            }
          />
        </Box>
        <Box mb={4} width="100%">
          <EmailAddressInput
            onChange={handleEmailChange}
            value={email}
            error={!!(formErrors.email && formErrors.email.length > 0)}
            helperText={
              formErrors.email && formErrors.email.length > 0
                ? formErrors.email[0]
                : null
            }
          />
        </Box>
        <Box mb={6} width="100%">
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
        <Box
          mb={6}
          width="100%"
          sx={
            useDesktopView
              ? {
                  wordWrap: "normal",
                  whiteSpace: "nowrap",
                }
              : {}
          }
        >
          <AgreeToPrivacyPolicyAndTermsInput
            onChange={onCheckedPrivacyPolicyAndTerms}
            value={agreeToPrivacyPolicyAndTerms}
            error={
              !!(
                formErrors.agreeToPrivacyPolicyAndTerms &&
                formErrors.agreeToPrivacyPolicyAndTerms.length > 0
              )
            }
            helperText={
              formErrors.agreeToPrivacyPolicyAndTerms &&
              formErrors.agreeToPrivacyPolicyAndTerms.length > 0
                ? formErrors.agreeToPrivacyPolicyAndTerms[0]
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
        submitText="Create Account"
      />
    </Box>
  )
}
