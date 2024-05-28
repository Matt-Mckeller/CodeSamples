"use client"
import { TICKET_POINT_OPTIONS } from "expanse.ui/points"
import React, { useState } from "react"

export const PointSelectionContext = React.createContext<{
  selectedTicketPoints?: TICKET_POINT_OPTIONS
  onSliderChange: (selectedPoints: TICKET_POINT_OPTIONS | any) => void
  setSelectedTicketPoints: (selectedPoints: TICKET_POINT_OPTIONS | any) => void
}>(null)

export function PointSelectionContextProvider({ children }) {
  const [selectedTicketPoints, setSelectedTicketPoints] = useState(
    TICKET_POINT_OPTIONS.THREE_POINTS,
  )
  const onSliderChange = (selectedPoints: TICKET_POINT_OPTIONS | any) => {
    setSelectedTicketPoints(selectedPoints)
  }
  return (
    <PointSelectionContext.Provider
      value={{
        selectedTicketPoints,
        setSelectedTicketPoints,
        onSliderChange,
      }}
    >
      {children}
    </PointSelectionContext.Provider>
  )
}
