"use client"
import { Box, Slider, styled, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { TICKET_POINT_OPTIONS_LIST, TICKET_POINT_OPTIONS } from "../index"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import { AnalyticsContext } from "../../application"

const PointSliderStyled = styled(Slider)(({ theme }) => ({
  color: `${theme.palette.primary.main}`,
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: `${theme.palette.primary.main}`,
    border: "1px solid currentColor",
    boxShadow: theme.shadows[1],
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .point-bar": {
      height: 9,
      width: 1,
      backgroundColor: "white",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 5,
    boxShadow: theme.shadows[1],
  },
  "& .MuiSlider-rail": {
    color: theme.palette.common.black,
    height: 5,
  },
  "& .MuiSlider-markLabel": {
    color: theme.palette.text.primary,
  },
  "& .MuiSlider-markLabelActive": {
    color: theme.palette.text.primary,
  },
}))

function CurrentMark({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Typography fontSize="1rem" fontWeight="700">
        {children}
      </Typography>
    </Box>
  )
}
const getSliderMarks = (currentIndex: number) =>
  TICKET_POINT_OPTIONS_LIST.map((v, index) => ({
    value: index === 0 ? 0 : (100 / 6) * index,
    label: currentIndex === index ? <CurrentMark>{v}</CurrentMark> : v,
  }))

const indexToPointsOfComplexity = (index: number): TICKET_POINT_OPTIONS => {
  if (index === 0) {
    return TICKET_POINT_OPTIONS.ONE_POINT
  }
  if (index === 1) {
    return TICKET_POINT_OPTIONS.TWO_POINTS
  }
  if (index === 2) {
    return TICKET_POINT_OPTIONS.THREE_POINTS
  }
  if (index === 3) {
    return TICKET_POINT_OPTIONS.FIVE_POINTS
  }
  if (index === 4) {
    return TICKET_POINT_OPTIONS.NINE_POINTS
  }
  if (index === 5) {
    return TICKET_POINT_OPTIONS.EIGHTEEN_POINTS
  }
  if (index === 6) {
    return TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS
  }
  return TICKET_POINT_OPTIONS.ONE_POINT
}
const pointsOfComplexityToIndex = (
  points: TICKET_POINT_OPTIONS | any,
): number => {
  if (points === TICKET_POINT_OPTIONS.ONE_POINT) {
    return 0
  }
  if (points === TICKET_POINT_OPTIONS.TWO_POINTS) {
    return 1
  }
  if (points === TICKET_POINT_OPTIONS.THREE_POINTS) {
    return 2
  }
  if (points === TICKET_POINT_OPTIONS.FIVE_POINTS) {
    return 3
  }
  if (points === TICKET_POINT_OPTIONS.NINE_POINTS) {
    return 4
  }
  if (points === TICKET_POINT_OPTIONS.EIGHTEEN_POINTS) {
    return 5
  }
  if (points === TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS) {
    return 6
  }
  return 0
}
export function PointSlider({
  onChange,
  defaultPoints = TICKET_POINT_OPTIONS.TWO_POINTS,
}: {
  defaultPoints?: TICKET_POINT_OPTIONS
  onChange?: (v: TICKET_POINT_OPTIONS) => void
}) {
  const startingIndex = TICKET_POINT_OPTIONS_LIST.indexOf(
    defaultPoints as TICKET_POINT_OPTIONS,
  )
  const [marks, setMarks] = useState(getSliderMarks(startingIndex))
  const [defaultValue] = useState(
    (pointsOfComplexityToIndex(defaultPoints) * 100) / 6,
  )
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  return (
    <PointSliderStyled
      onChange={(e: Event, v: number | number[]) => {
        const activeIndex = Math.round(((v as number) * 6) / 100)
        setMarks(getSliderMarks(activeIndex))
        if (onChange) {
          const pointsOfComplexityValue = indexToPointsOfComplexity(activeIndex)
          onChange(pointsOfComplexityValue)
          registerAnalyticsEvent({
            variables: {
              event: "update-points-of-complexity-slider",
              ...analyticsEventContext,
              params: JSON.stringify({ value: pointsOfComplexityValue }),
            },
          })
        }
      }}
      marks={marks}
      getAriaLabel={(index: number) =>
        index === 0 ? "Selected Points" : "Selected Points"
      }
      defaultValue={defaultValue}
      step={null}
      valueLabelDisplay="off"
    />
  )
}
