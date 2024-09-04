import React, { useRef } from "react"
import { useTheme } from "@mui/system"
import { useDynamicAssets } from ".."
import { BackgroundGradient1 } from "../style"
import { DualRectGroup1, DualCircleGroup1 } from "../shapes"

const smallerCardTotalHeight = 12
const smallerCardTotalWidth = 18
const biggerCardTotalHeight = 30
const biggerCardTotalWidth = 40
const backgroundGradientName = "linearGradient"

function SmallerCard() {
  const theme = useTheme()
  const cardBackgroundColor = theme.palette.background.medium

  const cardTextColor = "white"
  const cardTextLineHeight = 1
  const cardTextLineGapHeight = 1
  const shorterLineWidth = (1 * smallerCardTotalWidth) / 3
  const longerLineWidth = (2 * smallerCardTotalWidth) / 3
  const textHeightTotal = 3 * cardTextLineHeight + 2 * cardTextLineGapHeight
  const startingLineY = (smallerCardTotalHeight - textHeightTotal) / 2

  const linePositions: any[] = [
    { x: smallerCardTotalWidth / 3, y: startingLineY },
    {
      x: smallerCardTotalWidth / 6,
      y: startingLineY + (cardTextLineGapHeight + cardTextLineHeight),
    },
    {
      x: smallerCardTotalWidth / 6,
      y: startingLineY + 2 * (cardTextLineGapHeight + cardTextLineHeight),
    },
  ]

  return (
    <g transform="translate(0 0)">
      <rect
        width={smallerCardTotalWidth}
        height={smallerCardTotalHeight}
        fill={cardBackgroundColor}
        rx={3}
      />
      <g transform={`translate(${linePositions[0].x} ${linePositions[0].y})`}>
        <rect
          width={shorterLineWidth}
          height={cardTextLineHeight}
          fill={cardTextColor}
          rx={0.5}
        />
      </g>
      <g transform={`translate(${linePositions[1].x} ${linePositions[1].y})`}>
        <rect
          width={longerLineWidth}
          height={cardTextLineHeight}
          fill={cardTextColor}
          rx={1}
        />
      </g>
      <g transform={`translate(${linePositions[2].x} ${linePositions[2].y})`}>
        <rect
          width={longerLineWidth}
          height={cardTextLineHeight}
          fill={cardTextColor}
          rx={1}
        />
      </g>
    </g>
  )
}

function BiggerCard() {
  const cardTextColor = "white"
  const textLineHeight = 1.5
  const textLineGap = 1.5

  const textHeightTotal = 3 * textLineHeight + 2 * textLineGap

  const cardPaddingX = (1 / 10) * biggerCardTotalWidth
  const cornerShapeWidth = (1 / 5) * (biggerCardTotalWidth - cardPaddingX * 2)
  const gapBetweenIconAndRightText = cardPaddingX / 2
  // Should fill the space to the right of the cornerShape with equal spacing between
  // the shape and the start of the text, and should run until the edge padding
  const shorterLineWidth =
    biggerCardTotalWidth -
    cardPaddingX * 2 -
    gapBetweenIconAndRightText -
    cornerShapeWidth

  const topLineStartX =
    cardPaddingX + gapBetweenIconAndRightText + cornerShapeWidth
  const gapBetweenIconAndBottomText = cardPaddingX * 0.75
  const longerLineWidth = biggerCardTotalWidth - 2 * cardPaddingX
  const longerLineStartX = cardPaddingX

  // Calculate Y and Height variables
  const cornerShapeHeight = (4 / 3) * cornerShapeWidth
  const totalContentHeight =
    cornerShapeHeight +
    gapBetweenIconAndBottomText +
    4 * textLineHeight +
    3 * textLineGap
  const cardPaddingY = (biggerCardTotalHeight - totalContentHeight) / 2
  // Want the center of the top two lines to be centered to the right of the square
  const topLineStartY =
    cardPaddingY +
    (1 / 2) * cornerShapeHeight -
    (1 / 2) * (2 * textLineHeight + textLineGap)
  const longerLineStartY =
    cardPaddingY + cornerShapeHeight + gapBetweenIconAndBottomText
  const theme = useTheme()
  const cardBackgroundColor = theme.palette.background.medium
  const cornerShapeFill = theme.palette.common.white
  return (
    <g transform="translate(0 0)">
      <rect
        width={biggerCardTotalWidth}
        height={biggerCardTotalHeight}
        fill={cardBackgroundColor}
        rx={3}
      />
      <g transform={`translate(${topLineStartX} ${topLineStartY})`}>
        <rect
          width={shorterLineWidth}
          height={textLineHeight}
          fill={cardTextColor}
          rx={0.5}
        />
      </g>
      <g
        transform={`translate(${topLineStartX} ${topLineStartY + textLineGap + textLineHeight})`}
      >
        <rect
          width={shorterLineWidth}
          height={textLineHeight}
          fill={cardTextColor}
          rx={0.5}
        />
      </g>
      <g transform={`translate(${longerLineStartX} ${longerLineStartY})`}>
        <rect
          width={longerLineWidth}
          height={textLineHeight}
          fill={cardTextColor}
          rx={1}
        />
      </g>
      <g
        transform={`translate(${longerLineStartX} ${longerLineStartY + 1 * (textLineGap + textLineHeight)})`}
      >
        <rect
          width={longerLineWidth}
          height={textLineHeight}
          fill={cardTextColor}
          rx={1}
        />
      </g>
      <g
        transform={`translate(${longerLineStartX} ${longerLineStartY + 2 * (textLineGap + textLineHeight)})`}
      >
        <rect
          width={longerLineWidth}
          height={textLineHeight}
          fill={cardTextColor}
          rx={1}
        />
      </g>
      <g
        transform={`translate(${longerLineStartX} ${longerLineStartY + 3 * (textLineGap + textLineHeight)})`}
      >
        <rect
          width={longerLineWidth}
          height={textLineHeight}
          fill={cardTextColor}
          rx={1}
        />
      </g>
      <rect
        x={cardPaddingX}
        y={cardPaddingY}
        width={cornerShapeWidth}
        height={cornerShapeHeight}
        fill={cornerShapeFill}
        rx={1}
      />
    </g>
  )
}

const totalBrowserWidth = 100
const totalBrowserHeight = (2 * totalBrowserWidth) / 3
const browserToolbarHeight = (1 / 15) * totalBrowserHeight
const browserSideAndBottomPadding = (1 / 60) * totalBrowserHeight
const browserInteriorScreenOverlayPadding = browserSideAndBottomPadding * 2
const browserButtonRadius = (1 / 4) * browserToolbarHeight
const browserButtonSpacing = browserButtonRadius
const browserInnerScreenWidth =
  totalBrowserWidth -
  browserSideAndBottomPadding * 2 -
  browserInteriorScreenOverlayPadding * 2
const browserInnerScreenHeight =
  totalBrowserHeight -
  browserSideAndBottomPadding -
  browserToolbarHeight -
  browserInteriorScreenOverlayPadding * 2
const sideArcLength = 3

function BrowserToolbar() {
  // start drawing bottom left
  const theme = useTheme()
  const fill = theme.palette.background.offsetBG
  return (
    <path
      transform="translate(0 0)"
      fill={fill}
      d={`m0,${browserToolbarHeight} 
    v-${browserToolbarHeight - sideArcLength} 
    a${sideArcLength} -${sideArcLength} 0 0 1  ${sideArcLength} -${sideArcLength}
    h${totalBrowserWidth - 2 * sideArcLength}
    a${sideArcLength} ${sideArcLength} 0 0 1  ${sideArcLength} ${sideArcLength}
    v${browserToolbarHeight - sideArcLength}
    z
    `}
    />
  )
}
function BrowserSecondScreenLayer() {
  const theme = useTheme()
  const fill = theme.palette.background.medium
  return (
    <g>
      <rect
        width={totalBrowserWidth - browserSideAndBottomPadding * 2}
        height={10}
        fill={fill}
      />
      <rect
        rx="3"
        width={totalBrowserWidth - browserSideAndBottomPadding * 2}
        height={
          totalBrowserHeight -
          browserSideAndBottomPadding -
          browserToolbarHeight
        }
        fill={fill}
      />
    </g>
  )
}
function BrowserInnerScreenLayer() {
  const { threeLayerInnerStroke } = useDynamicAssets()

  return (
    <rect
      rx="3"
      width={browserInnerScreenWidth}
      height={browserInnerScreenHeight}
      fill={`url('#${backgroundGradientName}')`}
      stroke={threeLayerInnerStroke}
      strokeWidth="1"
      // opacity={0.3}
    />
  )
}
function BrowserToolbarButtons() {
  const theme = useTheme()
  const fill = theme.palette.background.default
  return (
    <g>
      {/* Circles are positioned based on the center of the circle, not top left (there is no top left) */}
      <circle r={browserButtonRadius} fill={fill} />
      <circle
        r={browserButtonRadius}
        fill={fill}
        cx={2 * browserButtonRadius + browserButtonSpacing}
      />
      <circle
        r={browserButtonRadius}
        fill={fill}
        cx={2 * (2 * browserButtonRadius + browserButtonSpacing)}
      />
    </g>
  )
}
function Browser() {
  const { palette } = useTheme()
  // Note: Circles are positioned based on their center
  const browserToolbarButtonY = browserToolbarHeight / 2
  const browserToolbarButtonX =
    browserSideAndBottomPadding +
    browserInteriorScreenOverlayPadding +
    browserButtonRadius
  const xCoordinateOfMiddleLeftCorner = sideArcLength / 2 - 0.44
  const yCoordinateOfMiddleLeftCorner = sideArcLength / 2 - 0.66
  const smallerCornerCircleArcRadius = 0.7
  return (
    <g id="browser">
      <rect
        width={totalBrowserWidth}
        height={totalBrowserHeight}
        rx={3}
        fill={palette.background.offsetBG}
      />
      <BrowserToolbar />

      <g
        transform={`translate(${browserSideAndBottomPadding} ${browserToolbarHeight})`}
      >
        <BrowserSecondScreenLayer />
      </g>
      <g
        transform={`translate(${browserSideAndBottomPadding + browserInteriorScreenOverlayPadding} ${browserToolbarHeight + browserInteriorScreenOverlayPadding})`}
      >
        <BrowserInnerScreenLayer />
        <path
          id="side-triangle-overlay-tech-migrations"
          d={`m0,${sideArcLength} v${browserInnerScreenHeight - sideArcLength} h${browserInnerScreenWidth * (69 / 100)} L${xCoordinateOfMiddleLeftCorner} ${yCoordinateOfMiddleLeftCorner}
      z`}
          fill={palette.common.black}
          opacity="0.1"
        />
      </g>
      <g
        transform={`translate(${browserToolbarButtonX} ${browserToolbarButtonY})`}
      >
        <BrowserToolbarButtons />
      </g>
    </g>
  )
}

export function SpiralBrowserScreen() {
  const theme = useTheme()

  const viewBoxWidth = 300
  const viewBoxHeight = 200
  const swirlCenterXCoordinate = viewBoxWidth / 6
  const swirlCenterYCoordinate = (2 * viewBoxHeight) / 3
  const card2ScaleFactor = 0.5
  const card3ScaleFactor = 0.75

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width="100%"
      height="100%"
      key="technology-migration-services-svg"
    >
      <defs>
        <BackgroundGradient1
          id={backgroundGradientName}
          key="background-gradient-1-technology-migration-services"
        />
      </defs>

      <g transform="scale(1.3) translate(0 -50)">
        <g
          transform={`translate(${swirlCenterXCoordinate - 36} ${swirlCenterYCoordinate - 25}) scale(1.5)`}
        >
          <path
            fill="none"
            stroke={theme.palette.background.contrastBG}
            strokeWidth="0.33"
            d="m 30.438861,19.988195 c 0.313227,-8.155735 -12.91625,-9.200288 -15.253246,-1.096163 -2.9495,7.868959 4.727119,15.2418 12.869137,13.452641 C 36.490018,31.233462 42.278949,21.578759 39.227715,13.50654 36.412982,3.3555879 24.21067,-2.9109802 14.58043,1.6459363 1.0043805,6.9978466 -4.6736714,26.554306 4.9065846,38.017579 13.902987,50.231598 32.459064,53.645185 45.072311,45.221681 54.542871,39.775094 59.089844,29.422882 63.655153,19.984893"
          />
        </g>

        {/* <g transform={`translate(${swirlCenterXCoordinate} ${swirlCenterYCoordinate})`}> */}
        <g
          transform={`translate(${swirlCenterXCoordinate - 45} ${swirlCenterYCoordinate}) scale(${card2ScaleFactor})`}
        >
          <BiggerCard />
        </g>
        {/* Right sides align: - (biggerCardTotalWidth * card3ScaleFactor) - smallerCardTotalWidth */}
        {/* Right to left sides align: + smallerCardTotalWidth */}
        <g
          transform={`translate(${swirlCenterXCoordinate + smallerCardTotalWidth} ${swirlCenterYCoordinate + 32}) scale(${card3ScaleFactor})`}
        >
          <BiggerCard />
        </g>
        <g
          transform={`translate(${swirlCenterXCoordinate} ${swirlCenterYCoordinate})`}
        >
          <SmallerCard />
        </g>
      </g>
      <g transform="translate(110 20) scale(1.8)">
        <Browser />
      </g>

      <g transform="translate(130 120) scale(0.5)">
        <DualCircleGroup1
          strokeVersion="white"
          id="lower-left-tech-migration-screen-circle"
          fillVersion="white"
        />
      </g>
      <g transform="translate(240 90)">
        <DualRectGroup1 id="rect-bg-browser-1" contrastStroke={false} />
      </g>
      <g transform="translate(180 53)">
        <DualRectGroup1 id="rect-bg-browser-2" contrastStroke={false} />
      </g>
      {/* <g transform="translate(160 180) scale(0.5)">
        <DualCircleGroup1 contrastStroke={false} />
      </g> */}
      <g transform="translate(60 80) scale(0.25)">
        <DualCircleGroup1 strokeVersion="contrastBG" />
      </g>
      <g transform="translate(30 160) scale(0.35)">
        <DualCircleGroup1 strokeVersion="contrastBG" />
      </g>

      {/* <SwirlLineAndCards /> */}
    </svg>
  )
}
