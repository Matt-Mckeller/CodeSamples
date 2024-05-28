"use client"

import { ApolloError, useMutation } from "@apollo/client"
import { Box, Link, Typography } from "@mui/material"
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  ExpanseValidator,
  VERIFY_RESET_PASSWORD_PASSCODE_VALIDATION_CONSTRAINTS,
} from "expanse.common"
import { PasscodeInput } from "expanse.ui/form"
import { AnalyticsContext, LayoutContext } from "expanse.ui/application"
import { CheckCircle } from "@mui/icons-material"
import gsap from "gsap"
import { SUBMIT_VERIFY_RESET_PASSWORD_PASSCODE } from "../../gql/submit-verify-reset-password-passcode"
import { SUBMIT_FORGOT_PASSWORD } from "../../gql/submit-forgot-password"
import { AuthFormSubmitActions } from "../AuthFormSubmitActions"
import { AuthFormsContext } from "../../context/AuthForms.context"
import { AuthDisplayContext, AuthFormScreen, useForgotPassword } from "../.."
import { REGISTER_ANALYTICS_EVENT } from "../../../application/gql"

export function VerifyResetPasswordPasscode() {
  const { email, resetPasscode, setResetPasscode } =
    useContext(AuthFormsContext)
  const [successAnimationRunning, setSuccessAnimationRunning] = useState(false)
  const successIconContainerRef = useRef<any>(null)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const { handleVerifyPasscodeResponse } = useForgotPassword()
  const { setCurrentScreen } = useContext(AuthDisplayContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
  } = useContext(LayoutContext)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({
    resetPasscode: [],
  })
  const [submitForm, { data, loading, error }] = useMutation(
    SUBMIT_VERIFY_RESET_PASSWORD_PASSCODE,
  )
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [
    resubmitForgotPassword,
    {
      data: forgotPasswordData,
      loading: forgotPasswordLoading,
      error: forgotPasswordError,
    },
  ] = useMutation(SUBMIT_FORGOT_PASSWORD)

  const AnimationTimeline = gsap.timeline({
    repeat: 0,
    yoyo: false,
    delay: 0,
    paused: true,
  })
  const AnimationTimelineRef = useRef(AnimationTimeline)

  const requestID = "verify-reset-password"

  if (loading) {
    if (currentLoadingProcessIDs.includes(requestID) && loading) {
      addLoadingProcessID(requestID)
    } else if (currentLoadingProcessIDs.includes(requestID) && !loading) {
      removeLoadingProcessID(requestID)
    }
  }

  if (forgotPasswordLoading) {
    if (currentLoadingProcessIDs.includes(requestID) && forgotPasswordLoading) {
      addLoadingProcessID(requestID)
    } else if (currentLoadingProcessIDs.includes(requestID) && !loading) {
      removeLoadingProcessID(requestID)
    }
  }

  const runSuccessfulSendAnimation = () => {
    if (!successAnimationRunning) {
      setSuccessAnimationRunning(true)
      AnimationTimelineRef.current.play().then(() => {
        AnimationTimelineRef.current.restart().pause()
        setSuccessAnimationRunning(false)
        setSubmitDisabled(false)
      })
    } else {
      console.log("Resend animation already playing")
    }
  }

  useEffect(() => {
    AnimationTimelineRef.current
      .to(successIconContainerRef.current, {
        y: 25,
        opacity: 0,
        duration: 0,
      })
      .to(successIconContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(successIconContainerRef.current, {
        // Do nothing
        duration: 1,
        y: 0,
      })
      .to(successIconContainerRef.current, {
        duration: 1,
        y: 25,
        opacity: 0,
      })
  }, [])

  const formIsValid = async () => {
    const validationResults = await ExpanseValidator(
      {
        email,
        resetPasscode,
      },
      VERIFY_RESET_PASSWORD_PASSCODE_VALIDATION_CONSTRAINTS,
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
    registerAnalyticsEvent({
      variables: {
        event: "clicked-verify-reset-passcode-form-submit",
        ...analyticsEventContext,
      },
    })

    const valid = (await formIsValid()) === true
    if (valid) {
      try {
        const response: any = await submitForm({
          variables: {
            email,
            resetPasscode,
          },
        })
        if (response && response?.data?.verifyResetPasswordPasscode?.success) {
          handleVerifyPasscodeResponse(response)
        } else if (
          response &&
          response?.data?.verifyResetPasswordPasscode?.success === false
        ) {
          setFormErrors({ resetPasscode: ["Invalid Passcode"] })
        } else {
          throw new Error(
            "Unknown error, invalid response format for verify reset passcode",
          )
        }
        setSubmitDisabled(false)
        setCurrentScreen(AuthFormScreen.ResetPassword)
      } catch (error: ApolloError | any) {
        // todo update error code reference to expanse error
        if (
          error &&
          error?.graphQLErrors &&
          error.graphQLErrors.length > 0 &&
          error.graphQLErrors[0]?.extensions &&
          error.graphQLErrors[0].extensions?.code === "BAD_USER_INPUT"
        ) {
          console.log("Invalid passcode")
          setFormErrors({ resetPasscode: ["Invalid Passcode"] })
        } else {
          console.error("Unknown error for verification of reset passcode.")
          setFormErrors({ resetPasscode: ["Invalid Passcode"] })
        }
        setSubmitDisabled(false)
      }
    } else {
      setSubmitDisabled(true)
    }
  }

  const resendForgotPassword = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    try {
      if (!successAnimationRunning && !submitDisabled) {
        registerAnalyticsEvent({
          variables: {
            event: "resend-forgot-password-verify-screen",
            ...analyticsEventContext,
          },
        })
        setSubmitDisabled(true)
        const response: any = await resubmitForgotPassword({
          variables: {
            email,
          },
        })
        // Submit re-enabled in success animation
        runSuccessfulSendAnimation()
      } else {
        console.log("Can not resend forgot email yet.")
      }
    } catch (e) {
      // todo verify working
      handleVerifyPasscodeResponse(e)
      setSubmitDisabled(false)
    }
  }

  const handlePasscodeChange = (val: string) => {
    setResetPasscode(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, resetPasscode: [] })
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box mb={4}>
          <Typography variant="body1" textAlign="center">
            We sent your code to:
            <br />
            {email}
          </Typography>
        </Box>
        <Box width="100%" mb={1}>
          <PasscodeInput
            onChange={handlePasscodeChange}
            value={resetPasscode}
            error={
              !!(
                formErrors.resetPasscode && formErrors.resetPasscode.length > 0
              )
            }
            helperText={
              formErrors.resetPasscode && formErrors.resetPasscode.length > 0
                ? formErrors.resetPasscode[0]
                : null
            }
          />
        </Box>
      </Box>
      <Box mb={4} display="flex" flexDirection="row">
        <Typography variant="body1" lineHeight="1">
          Didn&apos;t receive a code?&nbsp;
          <Link
            variant="button"
            sx={{
              cursor: "pointer",
              "&:disabled":
                successAnimationRunning || submitDisabled ? "true" : "false",
            }}
            onClick={resendForgotPassword}
          >
            Resend
          </Link>
        </Typography>
        <Box height="24px" sx={{ opacity: 0 }} ref={successIconContainerRef}>
          <CheckCircle height="100%" />
        </Box>
      </Box>
      {/* Form side action row */}
      <AuthFormSubmitActions
        submitDisabled={submitDisabled}
        loading={loading}
        handleOnSubmit={handleOnSubmit}
        submitText="CONFIRM RESET CODE"
      />
    </Box>
  )
}
