import React, { useContext } from "react"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import {
  PointSelectionContext,
  TICKET_POINT_OPTIONS_MAP,
} from "expanse.ui/points"
import { TicketCard, PointSlider } from "."
import { TICKET_POINT_OPTIONS, TICKET_POINT_VALUES } from ".."

type ExplanationTextProps = {
  ticketPoints?: TICKET_POINT_OPTIONS
  displayOnlyY?: boolean
}

export function ComplexityExplanationText({
  ticketPoints = TICKET_POINT_OPTIONS.ONE_POINT,
  displayOnlyY = false,
  ...props
}: ExplanationTextProps) {
  const displayedMultiplier = ticketPoints
    ? TICKET_POINT_OPTIONS_MAP[ticketPoints]
    : "UNKNOWN"
  if (ticketPoints === TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS) {
    return (
      <Box {...props} px={2}>
        <Box display="inline" textAlign="center">
          <Typography variant="subtitle1" fontSize="1.2rem">
            Needs to be Simplified
          </Typography>
        </Box>
      </Box>
    )
  }
  return (
    <Box textAlign="center">
      <Typography variant="body1" component="p" fontWeight="bold">
        {displayedMultiplier} Times More Challenging
      </Typography>{" "}
      <Typography variant="body1" component="p">
        than a 1 Point Task
      </Typography>
    </Box>
  )
}

export function TicketWithSlider() {
  const { selectedTicketPoints, onSliderChange } = useContext(
    PointSelectionContext,
  )

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <TicketCard ticketPoints={selectedTicketPoints} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        mt={4}
      >
        <Typography variant="body1" fontWeight="500">
          POINTS SLIDER
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        alignSelf="center"
        width="300px"
        mt={2}
      >
        <PointSlider
          defaultPoints={selectedTicketPoints}
          onChange={onSliderChange}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        mt={4}
      >
        <ComplexityExplanationText ticketPoints={selectedTicketPoints} />
      </Box>
    </Box>
  )
}
