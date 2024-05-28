"use client"
import React, { useContext } from "react"
import { Button } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { AuthSessionContext } from ".."
import { AnalyticsContext } from "../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"

export type LogoutButtonProps = {
  customText?: string
}
export function LogoutButton({ customText }: LogoutButtonProps) {
  const { handleLogout } = useContext(AuthSessionContext)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  const onClick = () => {
    handleLogout()
    registerAnalyticsEvent({
      variables: { event: "successful-logout", ...analyticsEventContext },
    })
  }

  const text = customText || "Logout"

  return (
    <Button
      variant="text"
      onClick={onClick}
      endIcon={<LogoutIcon fontSize="medium" />}
      disableElevation
    >
      {text}
    </Button>
  )
}
