"use client"
import React from "react"
import { AuthFormsProvider } from "./AuthForms.context"
import { AuthDisplayProvider } from "./AuthDisplay.context"
import { AuthSessionProvider } from "./AuthSession.context"

export function AuthProvider({ children, authNavRoute }: any) {
  return (
    // Some hierarchical dependencies here, i.e. Auth Session Must be before display
    <AuthSessionProvider>
      <AuthFormsProvider>
        <AuthDisplayProvider authNavRoute={authNavRoute}>
          {children}
        </AuthDisplayProvider>
      </AuthFormsProvider>
    </AuthSessionProvider>
  )
}
