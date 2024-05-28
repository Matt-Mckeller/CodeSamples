import React, { useContext } from "react"
import { AuthFormsContext } from "../context/AuthForms.context"
import { LayoutContext } from "expanse.ui/application"

interface StandardRequestResponseContext {
  onErrorResponse: (errorMessage: string) => void
  onSuccessResponse: () => void
}

// Clearing the password on form submit, shows error message in snackbar
// Moved loading spinner handling and success display out to components
export function useAuthDefaultApiHandlers(): StandardRequestResponseContext {
  const { showSnackbarError, showSnackbarSuccess } = useContext(LayoutContext)
  const { setPassword } = useContext(AuthFormsContext)

  const onErrorResponse = (errorMessage: string) => {
    // console.log('Standard Auth Error Response, Message To Display: ', errorMessage)
    setPassword("")
    showSnackbarError(errorMessage)
  }

  const onSuccessResponse = () => {
    // console.log('Successful response!')
    setPassword("")
  }

  return {
    onErrorResponse,
    onSuccessResponse,
  }
}
