"use client"
import React, { useEffect, useContext, useMemo } from "react"
import { JwtAuthData } from "../types"
import { User, UserContext } from "expanse.ui/user"
import JsonWebToken from "jsonwebtoken"
import { useMutation } from "@apollo/client"
import { SUBMIT_LOGOUT } from "../gql/submit-logout"
import { useRouter } from "next/navigation"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { LayoutContext } from "../../application"
import { AuthContent } from "../config/AuthContent"
import { UserInterface } from "../../user/types"

type AuthSessionContextType = {
  jwt: string | null
  handleSuccessfulLogin: (jwtResponse: string) => boolean
  handleLogout: () => void
  userIsAuthenticated: boolean
}

export const AuthSessionContext =
  React.createContext<AuthSessionContextType>(null)

export const AuthSessionProvider = ({ children }) => {
  // Note: Will want to track changes through the backend to support multiple applications, and devices, shared state and scalability.
  // Keep this built in such a way that it can be

  const [jwt, setJwt] = React.useState<string | null>(null)
  const { user, initializeUser, clearUser } = useContext(UserContext)
  const userIsAuthenticated: boolean = !!(user && user.id)
  const router = useRouter()

  const handleSuccessfulLogin = (jwtResponse: string): User | false => {
    setJwt(jwtResponse)
    try {
      localStorage.setItem("jwt", jwtResponse)
      const decodedJwtData: JwtAuthData = JsonWebToken.decode(jwtResponse)
      const userModel = User.createUserFromJwtResponse(decodedJwtData)
      initializeUser(userModel)
      return userModel
    } catch (e) {
      // todo, should we instead throw an error?
      console.error("Error trying to set login data.", { e })
      return false
    }
  }

  // todo convert to expanse api sending
  const [submitLogout] = useMutation(SUBMIT_LOGOUT)

  const handleLogout = async () => {
    if (user) {
      clearUser()
      localStorage.removeItem("jwt")
      if (jwt) {
        try {
          router.push("/")
          await submitLogout({ variables: { jwt } })
        } catch (e) {
          console.error("Error logging out on the backend.", { e })
        }
      } else {
        console.error("Unable to submit logout, no jwt found.")
      }
    } else {
      console.error("Attempting to logout when there is no authenticated user.")
    }
  }

  useEffect(() => {
    // Track auth through refresh and page navigation by fetching jwt from local storage
    if (!user) {
      const jwtStorage = localStorage.getItem("jwt")
      if (jwtStorage) {
        handleSuccessfulLogin(jwtStorage)
      }
    }
  })

  const values = useMemo(
    () => ({
      jwt,
      user,
      handleSuccessfulLogin,
      handleLogout,
      userIsAuthenticated,
    }),
    [jwt, user, handleSuccessfulLogin, handleLogout, userIsAuthenticated],
  )

  return (
    <AuthSessionContext.Provider value={values}>
      {children}
    </AuthSessionContext.Provider>
  )
}
