"use client"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import { Box } from "@mui/system"
import {
  REGISTER_ANALYTICS_EVENT,
  AnalyticsContext,
} from "expanse.ui/application"

import { TicketWithSlider, PointsTable, PointsChart } from "expanse.ui/points"
import { useState, useContext } from "react"
import { useMutation } from "@apollo/client"

type PointViewOption = "card" | "chart" | "table"
export const PointExampleSection = ({ cardWidth }: { cardWidth: number }) => {
  const [activePointsView, setActivePointsView] =
    useState<PointViewOption>("card")
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const toggleActivePointsView = (e: any) => {
    setActivePointsView(e.target.value)
    registerAnalyticsEvent({
      variables: {
        event: "toggle-services-active-points-view",
        params: JSON.stringify({ value: e.target.value }),
        ...analyticsEventContext,
      },
    })
  }
  return (
    <>
      <Box mb={4} display="flex" flexDirection="row" justifyContent="center">
        <ToggleButtonGroup
          color="standard"
          value={activePointsView}
          exclusive
          onChange={toggleActivePointsView}
          aria-label="Point visualization Examples"
          sx={{
            ".MuiToggleButton-standard": {
              width: "100px", // separate
            },
          }}
        >
          <ToggleButton value="card">Card</ToggleButton>
          <ToggleButton value="chart">Chart</ToggleButton>
          <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {activePointsView === "card" && <TicketWithSlider />}
      {activePointsView === "chart" && (
        <Box display="flex" alignContent="center" justifyContent="center">
          <Box width="300px">
            <PointsChart />
          </Box>
        </Box>
      )}
      {activePointsView === "table" && (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          width="100%"
          minWidth="100%"
        >
          <Box maxWidth={cardWidth} width={cardWidth}>
            <PointsTable />
          </Box>
        </Box>
      )}
    </>
  )
}
