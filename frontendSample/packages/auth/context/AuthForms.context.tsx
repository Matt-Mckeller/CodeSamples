"use client"
import React, { useMemo, useState } from "react"

type AuthFormContextType = {
  email: string
  setEmail: (v: string) => void
  fullName: string
  setFullName: (v: string) => void
  password: string
  setPassword: (v: string) => void
  resetPasscode: string
  setResetPasscode: (v: string) => void
  agreeToPrivacyPolicyAndTerms: boolean
  setAgreeToPrivacyPolicyAndTerms: (v: boolean) => void
}

function useAuthForms() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resetPasscode, setResetPasscode] = useState("")
  const [agreeToPrivacyPolicyAndTerms, setAgreeToPrivacyPolicyAndTerms] =
    useState(false)

  return {
    email,
    setEmail,
    fullName,
    setFullName,
    password,
    setPassword,
    resetPasscode,
    setResetPasscode,
    agreeToPrivacyPolicyAndTerms,
    setAgreeToPrivacyPolicyAndTerms,
  }
}

export const AuthFormsContext = React.createContext<AuthFormContextType>(null)

export function AuthFormsProvider({ children }: any) {
  const authFormsContext = useAuthForms()

  const value: AuthFormContextType = useMemo(
    () => authFormsContext,
    [authFormsContext],
  )

  return (
    <AuthFormsContext.Provider value={value}>
      {children}
    </AuthFormsContext.Provider>
  )
}
