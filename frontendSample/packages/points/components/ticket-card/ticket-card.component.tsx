"use client"
import React from "react"
import { Box, useTheme } from "@mui/system"
import { Typography } from "@mui/material"

import { TICKET_POINT_OPTIONS } from "expanse.ui/points"
import { ExpanseLogo } from "expanse.dynamicAssets"
import { DifficultyLevelDisplay } from "./difficulty-level-display.component"
import { DescriptionBar } from "./description-bar.component"
import { TicketDifficultyMeter } from "./difficulty-meter.component"
import { DifficultyTierDisplay } from "./difficulty-tier-display.component"
import CheckIcon from "@mui/icons-material/Check"
import { TicketPoints } from "./point-display.component"

type Props = {
  ticketTitle?: string
  ticketPoints?: TICKET_POINT_OPTIONS
  scaleFactor?: number // Transform scale that applies to the entire card
  showCheckmark?: boolean
}

export function TicketCard({
  ticketTitle = "WEB APP DEVELOPMENT",
  ticketPoints = TICKET_POINT_OPTIONS.THREE_POINTS,
  scaleFactor = 1,
  showCheckmark = false,
}: Props) {
  const theme = useTheme()
  const background = theme.palette.primary.main

  return (
    <Box
      display="flex"
      flexDirection="column"
      color="common.white"
      px={4}
      py={2}
      sx={{
        borderRadius: "7px",
        // @ts-expect-error MUI type is not labeled here, could use cssstyle import type override but not much value here
        // the 'unknown' type set by mui is curious 8|
        boxShadow: theme.shadows[1],
        background,
        transform: `scale(${scaleFactor})`,
      }}
      width="300px"
      height="150px"
    >
      <Box display="flex" flexDirection="row" py={1} flexBasis="20%">
        {/* Top Card Row */}
        <Box flexBasis="80%" display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={{ fontSize: "14px", fontWeight: 700 }}
          >
            {ticketTitle}
          </Typography>
        </Box>
        <Box
          flexBasis="20%"
          display="flex"
          justifyContent="flex-end"
          sx={{ height: "21px" }}
        >
          <ExpanseLogo
            fill={theme.palette.common.white}
            ringFill={theme.palette.common.white}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexBasis="20%"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography
          variant="body1"
          sx={{ lineHeight: "12px", fontSize: "12px", fontWeight: "bold" }}
        >
          Status: In Progress
        </Typography>
      </Box>
      <Box display="flex" flexBasis="40%">
        {/* Middle Card Row */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pb={2}
        >
          <DescriptionBar />
          <DescriptionBar useLongerBar />
          <DescriptionBar />
        </Box>
      </Box>
      <Box display="flex" flexBasis="20%" flexDirection="column">
        {/* Bottom Card Row */}
        <Box
          flexGrow={1}
          height="21px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TicketDifficultyMeter ticketPoints={ticketPoints} />
          <TicketPoints ticketPoints={ticketPoints} />
        </Box>

        <Box
          flexGrow={1}
          height="21px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <DifficultyTierDisplay ticketPoints={ticketPoints} />
          <DifficultyLevelDisplay ticketPoints={ticketPoints} />
        </Box>
      </Box>
      {showCheckmark && (
        <Box height="100px" position="absolute" top="25px" left="60px">
          <CheckIcon />
        </Box>
      )}
    </Box>
  )
}
