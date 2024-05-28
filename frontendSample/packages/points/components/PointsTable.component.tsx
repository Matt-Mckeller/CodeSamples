import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  useTheme,
} from "@mui/material"
import React from "react"
import AllInclusiveIcon from "@mui/icons-material/AllInclusive"
import { TICKET_POINT_OPTIONS, TICKET_POINT_OPTIONS_MAP } from "../"

interface TableRow {
  points: string
  displayedMetric: string
}
function createData(points: string, displayedMetric: string): TableRow {
  return {
    points,
    displayedMetric,
  }
}

const rows = Object.keys(TICKET_POINT_OPTIONS_MAP).map((POINT_OPTION, index) =>
  createData(
    `${POINT_OPTION} ${index === 0 ? "Point" : "Points"}`,
    `${TICKET_POINT_OPTIONS_MAP[POINT_OPTION]}:1`,
  ),
)
rows.pop() // Pop 81 because its displayed manually with an icon

export function PointsTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", border: "1px solid black" }}
    >
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="50%">
              Estimate
            </TableCell>
            <TableCell align="center" width="50%">
              Complexity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.points}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center" width="50%">
                {row.points}
              </TableCell>
              <TableCell align="center" width="50%">
                {row.displayedMetric}
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            key={TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row" align="center" width="50%">
              81 Points
            </TableCell>
            <TableCell align="center" width="50%">
              <Box display="flex" flexDirection="row" justifyContent="center">
                <Box>
                  <AllInclusiveIcon />
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
