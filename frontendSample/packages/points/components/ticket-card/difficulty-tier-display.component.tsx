"use client"
import React from "react"
import { styled, Theme } from "@mui/material/styles"
import { Box } from "@mui/system"
import { Tooltip, Typography } from "@mui/material"
import {
  TICKET_POINT_OPTIONS,
  getPointDifficultyLabel,
} from "expanse.ui/points"
import SpeedIcon from "@mui/icons-material/Speed"

const PREFIX = "expanse-pricing-difficulty-stars-component"

const classes = {
  root: `${PREFIX}-root`,
  difficultyText: `${PREFIX}-difficultyText`,
}

type Props = {
  ticketPoints?: TICKET_POINT_OPTIONS
}
const ComponentRoot = styled(Box)(({ theme }: { theme: Theme }) => ({
  [`&.${classes.root}`]: {},
  [`.${classes.difficultyText}`]: {},
}))

export function DifficultyTierDisplay({
  ticketPoints = TICKET_POINT_OPTIONS.ONE_POINT,
}: Props) {
  const textDescription = getPointDifficultyLabel(ticketPoints)

  return (
    <Tooltip title="Difficulty">
      <ComponentRoot
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SpeedIcon sx={{ width: "18px", height: "18px" }} />
        <Typography
          sx={{
            pl: 1,
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: 700,
            textShadow: "none",
          }}
        >
          {textDescription}
        </Typography>
      </ComponentRoot>
    </Tooltip>
  )
}
