"use client"
import React from "react"
import { Box } from "@mui/system"
import { TICKET_POINT_OPTIONS } from "expanse.ui/points"
import Favorite from "@mui/icons-material/Favorite"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"

function Heart({
  filled,
  displayEmpty,
}: {
  filled: boolean
  displayEmpty: boolean
}) {
  if (filled) {
    return <Favorite sx={{ height: "18px", width: "18px" }} />
  }
  if (displayEmpty === true) {
    return <FavoriteBorder sx={{ height: "18px", width: "18px" }} />
  }
  return null
}

type Props = {
  ticketPoints?: TICKET_POINT_OPTIONS
}

export function TicketDifficultyMeter({
  ticketPoints = TICKET_POINT_OPTIONS.ONE_POINT,
}: Props) {
  let filledIconCount
  switch (ticketPoints) {
    case TICKET_POINT_OPTIONS.ONE_POINT:
      filledIconCount = 1
      break
    case TICKET_POINT_OPTIONS.TWO_POINTS:
      filledIconCount = 1
      break
    case TICKET_POINT_OPTIONS.THREE_POINTS:
      filledIconCount = 2
      break
    case TICKET_POINT_OPTIONS.FIVE_POINTS:
      filledIconCount = 3
      break
    case TICKET_POINT_OPTIONS.NINE_POINTS:
      filledIconCount = 4
      break
    case TICKET_POINT_OPTIONS.EIGHTEEN_POINTS:
      filledIconCount = 5
      break
    case TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS:
    default:
      filledIconCount = 5
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Heart filled={filledIconCount >= 1} displayEmpty={false} />
      <Heart filled={filledIconCount >= 2} displayEmpty={false} />
      <Heart filled={filledIconCount >= 3} displayEmpty={false} />
      <Heart filled={filledIconCount >= 4} displayEmpty={false} />
      <Heart filled={filledIconCount >= 5} displayEmpty={false} />
    </Box>
  )
}
