"use client"
import React from "react"
import { styled, Theme, alpha } from "@mui/material/styles"
import { Box, useTheme } from "@mui/system"
import { Typography } from "@mui/material"
import { ExpanseLogo } from "expanse.dynamicAssets"
import {
  TICKET_POINT_OPTIONS,
  TICKET_POINT_OPTIONS_MAP,
} from "expanse.ui/points"

const PREFIX = "expanse-template-component"

const classes = {
  root: `${PREFIX}-root`,
  ticketLevel: `${PREFIX}-ticketLevel`,
}

type Props = {
  ticketPoints?: TICKET_POINT_OPTIONS
  displayLevelVersion?: boolean
}
const ComponentRoot = styled(Box)(({ theme }: { theme: Theme }) => ({
  [`.${classes.ticketLevel}`]: {
    fontSize: "14px",
    fontWeight: 700,
    textShadow: "none",
  },
}))

export function DifficultyLevelDisplay({
  displayLevelVersion = false,
  ticketPoints = TICKET_POINT_OPTIONS.ONE_POINT,
}: Props) {
  const theme = useTheme()
  const displayedText =
    ticketPoints === TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS
      ? "?"
      : TICKET_POINT_OPTIONS_MAP[ticketPoints]
  const displayedLabel = "Difficulty Level: "

  if (displayLevelVersion === true) {
    return (
      <ComponentRoot className={classes.root}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography className={classes.ticketLevel}>
            Level {displayedText}
          </Typography>
          <Box
            height="12px"
            maxHeight="12px"
            pl={1}
            display="flex"
            justifyContent="center"
          >
            <ExpanseLogo
              fill={theme.palette.common.white}
              ringFill={theme.palette.common.white}
            />
          </Box>
        </Box>
      </ComponentRoot>
    )
  }

  return (
    <ComponentRoot className={classes.root}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography className={classes.ticketLevel}>
          {displayedLabel} {displayedText}
        </Typography>
      </Box>
    </ComponentRoot>
  )
}
