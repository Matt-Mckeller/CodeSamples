"use client"
import React, { useEffect, useState } from "react"
import { Box, useTheme, alpha } from "@mui/material"
import { TICKET_POINT_OPTIONS, TICKET_POINT_VALUES } from "expanse.ui/points"

import Chart from "chart.js/auto"

// Filtering because Object.values on an enum returns both string index and the value
const pointLabels: number[] = Object.values(TICKET_POINT_OPTIONS).filter(
  (value) => typeof value === "number",
) as number[]
const pointValues: number[] = Object.values(TICKET_POINT_VALUES).filter(
  (value) => typeof value === "number",
) as number[]
pointValues.pop()
pointValues.push(250)
export function PointsChart() {
  const chartName = "points-chart"
  const [chart, setChart]: any = useState(null)
  const theme = useTheme()
  useEffect(() => {
    const canvasElement: HTMLCanvasElement = document.getElementById(
      chartName,
    ) as HTMLCanvasElement
    const canvasElementContext: CanvasRenderingContext2D =
      canvasElement.getContext("2d") as CanvasRenderingContext2D

    const c = new Chart(canvasElementContext as any, {
      type: "line",
      data: {
        labels: pointLabels,
        datasets: [
          {
            label: "Point Difficulty",
            data: pointValues,
            borderWidth: 1,
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHitRadius: 50,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            grid: {
              color: alpha(theme.palette.text.primary, 0.36),
            },
            title: {
              text: "Point Estimate",
              display: true,
              color: theme.palette.text.primary,
              font: { family: "Xpens" },
            },
            ticks: {
              color: theme.palette.text.primary,
              font: { family: "Xpens" },
            },
          },
          y: {
            title: {
              text: "Experience",
              display: true,
              color: theme.palette.text.primary,
              font: { family: "Xpens" },
            },
            grid: {
              color: alpha(theme.palette.text.primary, 0.36),
            },
            max: 120,
            display: true,
            ticks: {
              // forces step size to be 50 units
              stepSize: 30,
              color: theme.palette.text.primary,
              font: { family: "Xpens" },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            yAlign: "top",
            callbacks: {
              title(context) {
                const value = context[0].raw || ""
                if (value === 1) {
                  return "This is the simplest task estimate."
                }
                return `This point estimate is ${value} times more difficult\n\rthan a one-point estimate.`
              },
            },
          },
        },
      },
    })
    setChart(c)
    return () => {
      c.clear()
      c.destroy()
    }
  }, [theme.palette.mode])
  return <canvas id={chartName} />
}
