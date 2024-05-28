"use client"
import React, { useEffect, useState } from "react"
import { Box, alpha, useTheme } from "@mui/system"
import Chart from "chart.js/auto"
import { Typography, useMediaQuery } from "@mui/material"
import { getExpanseChartJSConfig } from "./ChartjsCommonConfig"

export function BarChartSample() {
  const chartName = "bar-chart-sample"
  const [chart, setChart]: any = useState(null)
  const theme = useTheme()
  const useMobileSize = useMediaQuery(theme.breakpoints.down("tablet"))

  useEffect(() => {
    const canvas: HTMLCanvasElement = document?.getElementById(
      chartName,
    ) as HTMLCanvasElement
    const canvasElementContext: any = canvas?.getContext("2d")

    const months = ["January", "February", "March", "April", "May", "June"]
    const labels = months
    const data = {
      labels,
      datasets: [
        {
          label: "Inefficiencies",
          data: [-10, -20, -30, -40, -50, -60],
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.33),
          maxBarThickness: 25,
          borderWidth: 3,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: "Opportunities",
          data: [10, 20, 30, 40, 50, 60],
          borderColor: alpha(theme.palette.primary.main, 0.33),
          backgroundColor: theme.palette.primary.main,
          maxBarThickness: 25,
          borderWidth: 3,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
      ],
    }

    const customChartOptions: any = {
      aspectRatio: 16 / 9,
      scales: {
        x: {
          display: true,
        },
        y: {
          title: {
            text: "(%) Change",
            display: true,
          },
          ticks: {
            callback: (label) => `${label}%`,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          reverse: true,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              let label = tooltipItem.dataset.label || ""
              const value: number = (tooltipItem.raw as number) || 0
              if (label) {
                if (value >= 0) {
                  label = `${label} grow by ${value}%`
                } else {
                  label = `${label} are reduced by ${value.toString().replace("-", "")}%`
                }
              }
              return label
            },
          },
        },
      },
    }
    const chartOptions = getExpanseChartJSConfig(theme, customChartOptions)

    const c = new Chart(canvasElementContext as any, {
      type: "bar",
      data,
      options: chartOptions,
    })

    setChart(c)
    return () => {
      c.clear()
      c.destroy()
    }
  }, [theme.palette.mode])

  return (
    <Box
      sx={{
        width: "500px",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      textAlign="center"
    >
      <Typography variant="body1" component="p" mb={3}>
        Expanse Bar Chart Sample
      </Typography>
      <canvas id={chartName} width="100%" />
    </Box>
  )
}
