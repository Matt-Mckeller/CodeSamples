"use client"
import React from "react"
import { styled, Theme } from "@mui/material/styles"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import { TICKET_POINT_OPTIONS } from "expanse.ui/points"

const PREFIX = "expanse-template-component"

const classes = {
  root: `${PREFIX}-root`,
  ticketLevel: `${PREFIX}-ticketLevel`,
}

type Props = {
  ticketPoints?: TICKET_POINT_OPTIONS
}
const ComponentRoot = styled(Box)(({ theme }: { theme: Theme }) => ({
  [`.${classes.ticketLevel}`]: {
    fontSize: "14px",
    fontWeight: 700,
    textShadow: "none",
  },
}))

export function TicketPoints({
  ticketPoints = TICKET_POINT_OPTIONS.ONE_POINT,
}: Props) {
  /* eslint-ignore indent*/
  const displayedText = ticketPoints
  const displayedLabel =
    ticketPoints === TICKET_POINT_OPTIONS.ONE_POINT ? "Point" : "Points"

  return (
    <ComponentRoot className={classes.root}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography className={classes.ticketLevel}>
          {displayedLabel}
          {": "}
          {displayedText}
        </Typography>
      </Box>
    </ComponentRoot>
  )
}
