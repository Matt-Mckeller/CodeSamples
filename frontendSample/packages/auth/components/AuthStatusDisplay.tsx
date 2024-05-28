"use client"
import React, { useContext } from "react"
import { UserContext } from "../../user"
import { Typography } from "@mui/material"

export function AuthStatusDisplay() {
  const { user } = useContext(UserContext)
  const displayContent = user && user.id

  if (displayContent) {
    return (
      <Typography variant="body1" component="p">
        Logged in as {user.fullName}
      </Typography>
    )
  }
  return null
}
