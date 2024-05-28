"use client"
import React, { useEffect, useState } from "react"
import { Box, alpha, rgbToHex, useTheme } from "@mui/system"
import Chart from "chart.js/auto"
import { Button, Typography, useMediaQuery } from "@mui/material"
import { getExpanseChartJSConfig } from "./ChartjsCommonConfig"

const generateRandomIncrementedNumbers = (existingData: number[]) => {
  if (!existingData || existingData.length === 0) {
    return 0
  }
  const lastIndex =
    existingData && existingData.length
      ? existingData[existingData.length - 1]
      : 0

  const min = lastIndex + 2
  const max = min + 6
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const createDataSet = (dataSetSize: number) => {
  const dataSet: number[] = []
  for (let i = 0; i < dataSetSize; i++) {
    dataSet.push(generateRandomIncrementedNumbers(dataSet))
  }
  return dataSet
}

export function LineChartSample() {
  const chartName = "line-chart-sample"
  const [chart, setChart]: any = useState(null)
  const theme = useTheme()
  const useMobileSize = useMediaQuery(theme.breakpoints.down("tablet"))
  // const [dataSets, setDataSets] = useState([])

  const additionalColors = [
    // '#621890', // Base Color: Purple
    theme.palette.primary.main,
    "#B4ECFE",
    // theme.palette.primary.dark,
    "#A144FF", // Bright Purple
    "#5AFF87", // Bright Green
    "#FF3E3E", // Bright Red
    "#8A6BBA", // Mid-Range Purple
    "#4DAF72", // Mid-Range Green
    "#FF3E3E", // Bright Red (Split-Complementary)
    "#3E75FF", // Bright Blue (Split-Complementary)
    "#3EFFB3", // Bright Teal (Triadic)
    "#C5BB4C", // Mid-Range Yellow (Tetradic)
    "#FF3E3E", // Bright Red (Tetradic)
    "#FFEF3E", // Bright Yellow (Tetradic)
    "#C54C4C", // Mid-Range Red (Split-Complementary)
    "#4C79C5", // Mid-Range Blue (Split-Complementary)
  ]

  const addUser = () => {
    const { data } = chart
    const dataSetSize =
      data?.datasets && data?.datasets[0] && data?.datasets[0].data?.length > 0
        ? data?.datasets[0].data?.length
        : data.labels.length
    const newDatasetData = createDataSet(dataSetSize)
    if (data.datasets.length < additionalColors.length) {
      const newDataset = {
        label: `User ${data.datasets.length + 1}`,
        data: newDatasetData,
        // borderColor: theme.palette.primary.main,
        borderColor: additionalColors[data.datasets.length],
        backgroundColor: alpha(additionalColors[data.datasets.length], 0.33),
        borderWidth: 3,
        borderSkipped: false,
      }
      chart.data.datasets.push(newDataset)
      chart.update()
    }
  }
  const removeUser = () => {
    // dont remove past 2
    const { data } = chart
    if (data.datasets.length > 0) {
      chart.data.datasets.pop()
      chart.update()
    }
  }
  const addMonth = () => {
    const { data } = chart
    if (data.labels.length > 0 && data.labels.length < 12) {
      data.labels = months.slice(0, data.labels.length + 1)

      for (let index = 0; index < data.datasets.length; ++index) {
        data.datasets[index].data.push(
          generateRandomIncrementedNumbers(data.datasets[index].data),
        )
      }

      chart.update()
    }
  }
  const removeMonth = () => {
    const { data } = chart
    if (data.datasets.length > 0) {
      data.labels = months.slice(0, data.labels.length - 1)

      for (let index = 0; index < data.datasets.length; ++index) {
        data.datasets[index].data.pop()
      }
      chart.update()
    }
  }

  useEffect(() => {
    const canvas: HTMLCanvasElement = document?.getElementById(
      chartName,
    ) as HTMLCanvasElement
    const canvasElementContext: any = canvas?.getContext("2d")

    const labels = months.slice(0, 5)
    const _initialDataSets = []

    _initialDataSets.push(createDataSet(5))
    _initialDataSets.push(createDataSet(5))

    const data = {
      labels,
      datasets: [
        {
          label: "User 1",
          data: _initialDataSets[0],
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.33),
          borderWidth: 3,
          borderSkipped: false,
        },
        {
          label: "User 2",
          data: _initialDataSets[1],
          borderColor: alpha(theme.palette.primary.main, 0.51),
          backgroundColor: alpha(theme.palette.primary.dark, 0.33),
          borderWidth: 3,
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
            text: "Experience",
            display: true,
          },
          ticks: {
            callback: (label) => `${label}`,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              let label = tooltipItem.dataset.label || ""
              const value: number = (tooltipItem.raw as number) || 0
              label = `${label} has ${value} total experience points`

              return label
            },
          },
        },
      },
    }
    const chartOptions = getExpanseChartJSConfig(theme, customChartOptions)

    const c = new Chart(canvasElementContext as any, {
      type: "line",
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
        Expanse Line Chart Sample
      </Typography>
      <canvas id={chartName} width="100%" />
      <Box display="flex" justifyContent="center" width="100%">
        <Button onClick={() => addUser()} sx={{ flex: 1 }}>
          Add User
        </Button>
        <Button onClick={() => removeUser()} sx={{ flex: 1 }}>
          Remove User
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <Button onClick={() => addMonth()} sx={{ flex: 1 }}>
          Add Month
        </Button>
        <Button onClick={() => removeMonth()} sx={{ flex: 1 }}>
          Remove Month
        </Button>
      </Box>
    </Box>
  )
}
