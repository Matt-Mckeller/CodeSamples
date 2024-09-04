"use client"
import React, { useMemo, useState, useContext } from "react"
import { AuthFormScreen } from "../types/enums"
import { useMediaQuery } from "@mui/material"
import { useRouter, usePathname } from "next/navigation"
import { AuthSessionContext } from "./AuthSession.context"
import { User, UserContext } from "../../user"
import { useMutation } from "@apollo/client"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { AnalyticsContext } from "../../application"
import { handleAnalyticsEventError } from "../../application/utility/handleAnalyticsEventError"

interface AuthNavContextType {
  displaySignInNav: boolean
  displaySignUpNav: boolean
  displayUserInNav: boolean
  handleAuthNavigation: (authNavType?: AuthScreenRoutes) => void
}
interface AuthScreenContextType {
  currentScreen: AuthFormScreen
  setCurrentScreen: (screen: AuthFormScreen) => void
  modalTitle: () => string
  authModalIsOpen: boolean
  openAuth: (screen?: AuthFormScreen) => void
  exitAuth: () => void
  openAuthModal: () => void
}
export type AuthDisplayContextType = AuthNavContextType & AuthScreenContextType

function useAuthScreensContext(authNavRoute): AuthScreenContextType {
  const [currentScreen, setCurrentScreen] = useState(AuthFormScreen.SignIn)
  const currentRoute = usePathname()
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false)
  const userIsOnDesktop = useMediaQuery((theme: any) =>
    theme.breakpoints.up("laptop"),
  )
  const router = useRouter()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const handleSetCurrentScreen = (value) => {
    setCurrentScreen(value)
    registerAnalyticsEvent({
      variables: {
        event: "update-auth-screen",
        params: JSON.stringify({ screenUpdate: value }),
        ...analyticsEventContext,
      },
    }).catch(handleAnalyticsEventError)
  }

  const modalTitle = () => {
    switch (currentScreen) {
      case AuthFormScreen.SignUp:
        return "Sign Up"
      case AuthFormScreen.SignIn:
        return "Sign In"
      case AuthFormScreen.ForgotPassword:
        return "Forgot Password?"
      case AuthFormScreen.VerifyResetPasscode:
        return "Enter Verification Code"
      case AuthFormScreen.ResetPassword:
        return "Password Reset"
      case AuthFormScreen.SignUpSuccess:
        return "Victory!"
      case AuthFormScreen.ResetPasswordSuccess:
        return "Update Successful!"
      default:
        return "Auth Modal Title"
    }
  }

  const openAuthModal = () => {
    registerAnalyticsEvent({
      variables: {
        event: "open-signup-modal",
        ...analyticsEventContext,
        params: null,
      },
    })
    setAuthModalIsOpen(true)
  }

  const exitAuth = () => {
    registerAnalyticsEvent({
      variables: {
        event: "exit-sign-up-manually",
        ...analyticsEventContext,
        params: JSON.stringify({
          cancelFromScreen: currentScreen,
        }),
      },
    })
    if (authModalIsOpen) {
      setAuthModalIsOpen(false)
    } else {
      router.back()
    }
  }

  const openAuth = (screen?: AuthFormScreen) => {
    if (screen) {
      handleSetCurrentScreen(screen)
    }
    if (userIsOnDesktop === false) {
      registerAnalyticsEvent({
        variables: {
          event: "open-auth-page",
          ...analyticsEventContext,
          params: null,
        },
      })
      router.push("/authentication")
    } else {
      openAuthModal()
    }
  }

  return {
    currentScreen,
    setCurrentScreen: handleSetCurrentScreen,
    modalTitle,
    authModalIsOpen,
    openAuth,
    openAuthModal,
    exitAuth,
  }
}

export type AuthScreenRoutes = "signIn" | "signUp" | "myAccount"

function useAuthNavContext({
  openAuth,
  user,
  accountNavRoute,
}: {
  openAuth: (screen?: AuthFormScreen) => void
  user: User | null
  accountNavRoute: string
}): AuthNavContextType {
  const { userIsAuthenticated } = useContext(AuthSessionContext)
  const router = useRouter()

  const displaySignUpNav = !userIsAuthenticated
  const displaySignInNav = !userIsAuthenticated
  const displayUserInNav = userIsAuthenticated

  const handleAuthNavigation = (authNavType?: AuthScreenRoutes) => {
    if (user && user.id) {
      router.push(accountNavRoute)
    } else if (!authNavType) {
      openAuth()
    } else if (authNavType === "signIn") {
      openAuth(AuthFormScreen.SignIn)
    } else if (authNavType === "signUp") {
      openAuth(AuthFormScreen.SignUp)
    }
  }

  return {
    displaySignInNav,
    displaySignUpNav,
    displayUserInNav,
    handleAuthNavigation,
  }
}

export const AuthDisplayContext =
  React.createContext<AuthDisplayContextType>(null)

export function AuthDisplayProvider({ children, authNavRoute }: any) {
  const { user } = useContext(UserContext)
  const { accountNavRoute } = useContext(UserContext)

  const {
    currentScreen,
    setCurrentScreen,
    modalTitle,
    authModalIsOpen,
    openAuth,
    openAuthModal,
    exitAuth,
  } = useAuthScreensContext(authNavRoute)
  const {
    displaySignInNav,
    displaySignUpNav,
    displayUserInNav,
    handleAuthNavigation,
  } = useAuthNavContext({ openAuth, user, accountNavRoute })
  const value: AuthDisplayContextType = useMemo(
    () => ({
      currentScreen,
      setCurrentScreen,
      modalTitle,
      authModalIsOpen,
      openAuth,
      openAuthModal,
      exitAuth,
      displaySignInNav,
      displaySignUpNav,
      displayUserInNav,
      handleAuthNavigation,
    }),
    [
      currentScreen,
      setCurrentScreen,
      modalTitle,
      authModalIsOpen,
      openAuth,
      openAuthModal,
      exitAuth,
      displaySignInNav,
      displaySignUpNav,
      displayUserInNav,
      handleAuthNavigation,
    ],
  )

  return (
    <AuthDisplayContext.Provider value={value}>
      {children}
    </AuthDisplayContext.Provider>
  )
}
