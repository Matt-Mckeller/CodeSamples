"use client"
import { Box, useTheme } from "@mui/material"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

import { DualCircleGroup1, DualRectGroup1 } from "../shapes"
import { BackgroundGradient1 } from "../style"
import { useDynamicAssets } from "../hooks"

function LighteningGroup() {
  const theme = useTheme()
  const lighteningPathColor = theme.palette.background.offsetBG
  const raindropColor = theme.palette.background.offsetBG
  return (
    <g id="Lightening" transform="translate(0 -10)" key="lightening_group">
      <g id="Lightening_5" data-name="Lightening 5" key="lightening_5">
        <path
          id="Trail_5"
          data-name="Trail 5"
          d="M150.55,139.66v22L139,168.49l.1,16.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_5"
          data-name="Raindrop 5"
          cx="139.05"
          cy="190.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_4" data-name="Lightening 4" key="lightening_4">
        <path
          id="Trail_4"
          data-name="Trail 4"
          d="M128.55,139.66v21L117,167.49l.1,6.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_4"
          data-name="Raindrop 4"
          cx="117.05"
          cy="180.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_3" data-name="Lightening 3" key="lightening_3">
        <line
          id="Trail_3"
          data-name="Trail 3"
          x1="96.95"
          y1="139.49"
          x2="97.04"
          y2="185.17"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_3"
          data-name="Raindrop 3"
          cx="97.05"
          cy="190.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_2" data-name="Lightening 2" key="lightening_2">
        <path
          id="Trail_2"
          data-name="Trail 2"
          d="M85.55,139.66v11L74,157.49l.1,16.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_2"
          data-name="Raindrop 2"
          cx="74.05"
          cy="180.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_1" data-name="Lightening 1" key="lightening_1">
        <path
          id="Trail_1"
          data-name="Trail 1"
          d="M63.55,139.66v31L52,177.49l.1,6.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_1"
          data-name="Raindrop 1"
          cx="52.05"
          cy="190.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
    </g>
  )
}

const addLighteningAnimations = (
  AnimationTimelineRef: any,
  lighteningBoltElements: any[],
  lighteningGroups: any[],
) => {
  const whiteLighteningAnimation = {
    strokeWidth: "3px",
    duration: 0.5,
    repeatDelay: 0.5,
    ease: "power1.in",
    repeat: -1,
  }

  const lighteningStrikeAnimation = {
    duration: 1,
    y: -10,
    ease: "power1",
    repeatDelay: 0,
    repeat: -1,
    yoyo: true,
  }

  // Bolt 5
  AnimationTimelineRef.current.from(
    lighteningBoltElements[0],
    { ...whiteLighteningAnimation, repeatDelay: 0.5 },
    0.5,
  )
  AnimationTimelineRef.current.to(
    lighteningGroups[0],
    { ...lighteningStrikeAnimation, repeatDelay: 0.5 },
    0.5,
  )

  // Bolt 4
  AnimationTimelineRef.current.from(
    lighteningBoltElements[1],
    whiteLighteningAnimation,
    0.75,
  )
  AnimationTimelineRef.current.to(
    lighteningGroups[1],
    lighteningStrikeAnimation,
    0.75,
  )

  // Bolt 3
  AnimationTimelineRef.current.from(
    lighteningBoltElements[2],
    { ...whiteLighteningAnimation, repeatDelay: 0.5 },
    0.5,
  )
  AnimationTimelineRef.current.to(
    lighteningGroups[2],
    { ...lighteningStrikeAnimation, repeatDelay: 0.5, y: -20 },
    0.5,
  )

  // Bolt 2
  AnimationTimelineRef.current.from(
    lighteningBoltElements[3],
    whiteLighteningAnimation,
    0,
  )
  AnimationTimelineRef.current.to(
    lighteningGroups[3],
    lighteningStrikeAnimation,
    0,
  )

  // Bolt 1
  AnimationTimelineRef.current.from(
    lighteningBoltElements[4],
    whiteLighteningAnimation,
    0,
  )
  AnimationTimelineRef.current.to(
    lighteningGroups[4],
    { ...lighteningStrikeAnimation, y: -15 },
    0,
  )
}

export function LighteningCloud() {
  const svgRef: any = useRef()
  const AnimationTimeline = gsap.timeline()
  const AnimationTimelineRef = useRef(AnimationTimeline)
  AnimationTimelineRef.current = AnimationTimeline
  const theme = useTheme()
  const {
    shapeStrokeColor,
    filledShapeColor,
    textLineRepresentationColor,
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useDynamicAssets()

  // Wait until DOM has been rendered
  useEffect(() => {
    const q = gsap.utils.selector(svgRef)
    const lighteningBoltElements = q("#Lightening path, #Lightening line")
    const lighteningGroups = q("#Lightening g")
    const rightCircleGroup = q("#Right_Circle_Group")
    const lineWithSquaresAtTheEnd = q(
      "#Horizontal_Line_with_Squares_At_The_End",
    )

    AnimationTimelineRef.current.timeScale(0.25)
    addLighteningAnimations(
      AnimationTimelineRef,
      lighteningBoltElements,
      lighteningGroups,
    )

    return () => {
      // AnimationTimelineRef.current.clear()
    }
  }, [])

  return (
    <Box height="100%">
      <svg
        id="svg-layer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 251.15 197.16"
        overflow="visible"
        width="100%"
        height="100%"
        key="IntegrationsAndApiDevelopmentService"
        ref={svgRef}
      >
        <defs>
          <BackgroundGradient1
            id="linear-gradient"
            key="background-gradient-1-integrations-api"
          />
        </defs>
        <g
          id="Integrations_and_API_Development_Container"
          data-name="Integrations and API Development Container"
        >
          <g transform="translate(12,0)">
            <LighteningGroup />
          </g>
          <g id="Cloud" transform="translate(12,0)">
            <path
              id="CloudOuterStroke"
              data-name="Cloud with Border"
              d="M161.17,57.06A61.79,61.79,0,0,0,45.65,40.56,49.46,49.46,0,0,0,51,139.19H158.29a41.39,41.39,0,0,0,41.26-41.27A40.76,40.76,0,0,0,161.17,57.06Z"
              transform="translate(0)"
              stroke={threeLayerOuterStroke}
              strokeMiterlimit="10"
              strokeWidth="14"
              strokeLinecap="round"
              fill="url(#linear-gradient)"
            />
            <path
              id="CloudCenterStroke"
              data-name="Cloud Inner Shape Border"
              d="M161.17,57.06A61.79,61.79,0,0,0,45.65,40.56,49.46,49.46,0,0,0,51,139.19H158.29a41.39,41.39,0,0,0,41.26-41.27A40.76,40.76,0,0,0,161.17,57.06Z"
              transform="translate(0)"
              stroke={threeLayerCenterStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="6"
              fill="url(#linear-gradient)"
            />
            <path
              id="CloudInner"
              data-name="Cloud Inner Shape Border"
              d="M161.17,57.06A61.79,61.79,0,0,0,45.65,40.56,49.46,49.46,0,0,0,51,139.19H158.29a41.39,41.39,0,0,0,41.26-41.27A40.76,40.76,0,0,0,161.17,57.06z"
              transform="translate(0)"
              stroke={threeLayerInnerStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="2"
              fill="url(#linear-gradient)"
            />
            <path
              id="Cloud_Mask_Darker_Left_Side"
              data-name="Cloud Mask Darker Left Side"
              d="M48.55,137.66a48,48,0,0,1,0-96l102,96Z"
              transform="translate(0)"
              opacity="0.1"
              fill={theme.palette.common.black}
              style={{ isolation: "isolate" }}
            />
          </g>

          <g id="Shapes">
            <g
              id="white-circles-integrations"
              transform="translate(39, 110) scale(0.75)"
            >
              <DualCircleGroup1 id="Left_Circle_Group" fillVersion="white" />
            </g>
            <g
              id="Horizontal_Line_with_Squares_At_The_End"
              data-name="Horizontal Line with Shapes At End"
            >
              <rect
                id="Horizontal_Line"
                data-name="Horizontal Line"
                x="5.53"
                y="139.38"
                width="65.9"
                height="0.52"
                fill={shapeStrokeColor}
              />
              <g transform="translate(0, 139)">
                <DualRectGroup1
                  id="rect-group-integrations-Bottom-left"
                  strokeVersion="contrastBG"
                />
              </g>
            </g>
            <path
              id="rightCircleMovementPath"
              d={`
                M183,135
                c10,0, 20,-35, 20,-35
                c-10,-20 -10,-20, -30, -35
              `}
              fill="none"
              stroke="none"
            />
            <g
              id="Right_Circle_Group"
              transform="translate(183,135) scale(0.75)"
            >
              <DualCircleGroup1 id="Right_Circle_Group" />
            </g>
          </g>
        </g>
      </svg>
    </Box>
  )
}
