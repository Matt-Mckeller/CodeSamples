"use client"
import React from "react"
import { styled, Theme, alpha } from "@mui/material/styles"
import { Box } from "@mui/system"
import classNames from "classnames"

const PREFIX = "expanse-template-component"

const classes = {
  root: `${PREFIX}-root`,
  longerBar: `${PREFIX}-longerBar`,
  defaultBar: `${PREFIX}-defaultBar`,
}

type Props = {
  useLongerBar?: boolean
}
const ComponentRoot = styled(Box)(({ theme }: { theme: Theme }) => ({
  [`&.${classes.root}`]: {
    borderRadius: "4px",
    height: "10px",
    background: "rgba(255,255,255,.77)",
    opacity: "56.3%",
  },
  [`&.${classes.defaultBar}`]: {
    width: "90px",
  },
  [`&.${classes.longerBar}`]: {
    width: "120px",
  },
}))

export function DescriptionBar({ useLongerBar = false, ...props }: Props) {
  return (
    <ComponentRoot
      my={0.5}
      {...props}
      className={classNames([
        classes.root,
        useLongerBar ? classes.longerBar : classes.defaultBar,
      ])}
    />
  )
}
