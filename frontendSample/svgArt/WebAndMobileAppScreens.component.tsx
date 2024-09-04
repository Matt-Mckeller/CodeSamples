"use client"
import { Box, useTheme } from "@mui/material"
import React from "react"
import { DualCircleGroup1, DualRectGroup1 } from "../shapes"
import { BackgroundGradient1 } from "../style"
import { useDynamicAssets } from "../hooks"

export function WebAndMobileAppScreens({
  dataId = "WebAndMobileAppScreens",
}: {
  dataId?: string
}) {
  const theme = useTheme()
  const {
    shapeStrokeColor,
    filledShapeColor,
    textLineRepresentationColor,
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useDynamicAssets()

  // 80% opacity
  // .8*255 = 204 / 16 = 12.75 -> .75 *16 = 12 so 12.12 = CC

  const deviceColor = threeLayerInnerStroke
  const keyBoardColor = `${theme.palette.background.dark}`
  const deviceStroke = threeLayerInnerStroke
  const keyboardStroke = threeLayerOuterStroke
  const screenStroke = threeLayerOuterStroke
  const deviceStrokeWidth = theme.palette.mode === "dark" ? 2 : 3
  const cameraColor = theme.palette.common.white
  // ^^v341165
  return (
    <Box
      height="100%"
      width="100%"
      minWidth="100%"
      key="web-and-mobile-app-dev-svg-container"
      sx={{ overflow: "hidden" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 300 200"
        key="web-and-mobile-app-dev-svg"
        data-id={dataId}
        // style={{ filter: (withShadow ? 'drop-shadow(2px 4px 2px black)' : '') }}
      >
        <defs>
          <BackgroundGradient1 key="background-gradient-1-web-and-mobile-app" />
        </defs>
        <g
          data-name="Web and Mobile App Development Graphic"
          transform="translate(-337.627 -165)"
        >
          <circle
            cx="15.31"
            cy="15.31"
            r="15.31"
            // fill="#90e189"
            fill={filledShapeColor}
            data-name="Ellipse 2, Largest Colored"
            transform="translate(388.592 319.814)"
          />
          <path
            fill={shapeStrokeColor}
            d="M416.232 297.654h189.422v.517H416.232z"
            data-name="Line at bottom of laptop"
          />

          <path
            fill={threeLayerCenterStroke}
            stroke={screenStroke}
            strokeWidth={deviceStrokeWidth}
            data-name="Laptop window frame"
            d="M514.333 186.82H447.1v-1.385h-30.486v1.385H349.1a4.548 4.548 0 0 0-4.548 4.548v92.062a4.549 4.549 0 0 0 4.548 4.549h165.233a4.549 4.549 0 0 0 4.548-4.549v-92.062a4.548 4.548 0 0 0-4.548-4.548z"
          />
          <rect
            fill="url(#BackgroundGradient1)"
            width="162.13"
            height="91.458"
            stroke={threeLayerInnerStroke}
            rx={5}
            ry={5}
            transform="translate(350.654 194.857)"
            data-name="Screen Gradient Layer"
          />
          {/* <path
            fill="url(#BackgroundGradient1)"
            d="M0 0h162.13v91.458H0z"
            stroke={theme.palette.common.black}
            rx={5}
            ry={5}
            strokeWidth="1px"
            data-name="Screen Gradient Layer"
            transform="translate(350.654 194.857)"
          /> */}
          <path
            fill={keyBoardColor}
            stroke={keyboardStroke}
            strokeWidth="1px"
            d="M523.433 284.653H507.61v-1.141a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.141h-3.39v-1.141a.227.227 0 0 0-.227-.226h-5.424a.226.226 0 0 0-.226.226v1.141h-3.391v-1.141a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.392v-1.14a.226.226 0 0 0-.226-.226h-5.424a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.226.226 0 0 0-.226-.226h-5.425a.227.227 0 0 0-.227.226v1.14h-3.39v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14H452v-1.14a.226.226 0 0 0-.226-.226h-42.49a.226.226 0 0 0-.226.226v1.14h-3.392v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14H396.4v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.227.227 0 0 0-.227-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14H368.6v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.227.227 0 0 0-.227-.226h-5.424a.226.226 0 0 0-.226.226v1.14h-10.4a5.425 5.425 0 0 0-5.425 5.425v2.453a5.425 5.425 0 0 0 5.425 5.425h180.377a5.424 5.424 0 0 0 5.425-5.425v-2.452a5.424 5.424 0 0 0-5.425-5.425z"
            data-name="Keyboard and laptop bottom"
          />
          <circle
            cx="1.663"
            cy="1.663"
            r="1.663"
            fill={cameraColor}
            data-name="Ellipse 3, Laptop Camera"
            transform="translate(429.917 189.037)"
          />
          <path
            d="M466.417 286.315H350.654v-91.458z"
            data-name="Triangle, Screen Lower Left Dark Corner"
            opacity=".1"
            style={{ isolation: "isolate" }}
          />
          <g transform="translate(372 269) scale(0.5)">
            <DualCircleGroup1
              id="screen circle group lower left"
              fillVersion="white"
              strokeVersion="white"
            />
          </g>
          <g data-name="Laptop Text Lines">
            <path
              fill={textLineRepresentationColor}
              d="M469.41 244.181h15.145v3.165H469.41z"
              data-name="Rectangle 3, Bottom Button"
            />
            <path
              fill={textLineRepresentationColor}
              d="M451.1 219.543h51.763v1.356H451.1z"
              data-name="Rectangle 4, Top Line"
            />
            <path
              fill={textLineRepresentationColor}
              d="M451.1 223.838h51.763v1.356H451.1z"
              data-name="Rectangle 5, Second Line"
            />
            <path
              fill={textLineRepresentationColor}
              d="M451.1 228.133h51.763v1.356H451.1z"
              data-name="Rectangle 6, Third Line"
            />
            <path
              fill={textLineRepresentationColor}
              d="M451.1 232.427h51.763v1.356H451.1z"
              data-name="Rectangle 7, Fourth Line"
            />
            <path
              fill={textLineRepresentationColor}
              d="M451.1 236.722h51.763v1.356H451.1z"
              data-name="Rectangle 8, Fifth Line"
            />
          </g>
          {/* <path fill={theme.palette.background.offsetBG} d="M496.534 196.713h6.329v6.329h-6.329z" data-name="Rectangle 9, Top Right Filled Laptop" /> */}
          {/* <path
            fill={textLineRepresentationColor}
            d="M505.8 205.981h-7.685v-7.686h7.685zm-7.351-.335h7.016v-7.017h-7.016z"
            data-name="Path 3, Top Right Laptop, Border Square"
          /> */}

          <path
            fill={shapeStrokeColor}
            d="M442.59 326.855h189.422v.517H442.59z"
            data-name="Rectangle 11, Long line bottom under phone and laptop"
          />
          <path
            fill={shapeStrokeColor}
            d="M387.418 350.63h65.897v.517h-65.897z"
            data-name="Rectangle 12, Short line bottom drawing under border circle"
          />
          <g transform="translate(470.972 327.232)">
            <DualRectGroup1
              id="rect-group-Bottom-Middle"
              strokeVersion="contrastBG"
            />
          </g>
          <path
            fill={shapeStrokeColor}
            d="M509.106 194.86h43.5v.517h-65.897z"
            data-name="Line Top Right Laptop Offscreen"
          />
          <g transform="translate(543.33 185.78)">
            <DualRectGroup1
              id="rect-group-Top-Middle"
              strokeVersion="contrastBG"
            />
          </g>
          <g transform="translate(616.204 327)">
            <DualRectGroup1
              id="rect-group-Bottom-Right"
              strokeVersion="contrastBG"
            />
          </g>

          <g id="phone">
            {/* <rect translate(577.972 236.232)/> */}
            <path
              // fill={textLineRepresentationColor}
              fill={threeLayerCenterStroke}
              stroke={threeLayerOuterStroke}
              strokeWidth={deviceStrokeWidth}
              d="M610.821 241.943h-.614V225.1a9.746 9.746 0 0 0-9.746-9.746h-35.676a9.745 9.745 0 0 0-9.746 9.746v92.38a9.746 9.746 0 0 0 9.746 9.746h35.676a9.747 9.747 0 0 0 9.746-9.746v-63.551h.615z"
              data-name="Path 9, Phone Border"
            />
            <path
              fill="url(#BackgroundGradient1)"
              stroke={threeLayerInnerStroke}
              strokeWidth="1"
              d="M608.131 225.677v92.244a7.278 7.278 0 0 1-7.277 7.28h-35.847a7.278 7.278 0 0 1-7.277-7.278v-92.246a7.278 7.278 0 0 1 7.277-7.278h4.349a3.458 3.458 0 0 0 3.2 4.763H593a3.459 3.459 0 0 0 3.2-4.763h4.656a7.278 7.278 0 0 1 7.277 7.277z"
              data-name="Path 10, Phone Screen Overlay Gradient"
            />

            <g data-name="Phone Text Detail Lines">
              <path
                fill={textLineRepresentationColor}
                d="M577.591 279.222h10.679v3.165h-10.679z"
                data-name="Rectangle 16, Phone Text Button"
              />
              <path
                fill={textLineRepresentationColor}
                d="M564.681 254.584h36.499v1.356h-36.499z"
                data-name="Rectangle 17, Phone Text Line 1"
              />
              <path
                fill={textLineRepresentationColor}
                d="M564.681 258.878h36.499v1.356h-36.499z"
                data-name="Rectangle 18, Phone Text Line 2"
              />
              <path
                fill={textLineRepresentationColor}
                d="M564.681 263.173h36.499v1.356h-36.499z"
                data-name="Rectangle 19, Phone Text Line 3"
              />
              <path
                fill={textLineRepresentationColor}
                d="M564.681 267.468h36.499v1.356h-36.499z"
                data-name="Rectangle 20, Phone Text Line 4"
              />
              <path
                fill={textLineRepresentationColor}
                d="M564.681 271.763h36.499v1.356h-36.499z"
                data-name="Rectangle 21, Phone Text Line 5"
              />
            </g>
            <g data-name="phone-rectangles">
              {/* 577.876 236 */}
              <g transform="translate(577.972 236.232)">
                <DualRectGroup1 id="rect-group-phone" />
              </g>
            </g>
            <path
              d="M608.131 308.071v9.85a7.278 7.278 0 0 1-7.277 7.28h-35.847a7.278 7.278 0 0 1-7.277-7.278v-49.672l30.2 23.86.517.408 5.618 4.437.524.416z"
              data-name="Phone Bottom Left Triangle Opacity Overlay"
              opacity=".1"
              style={{ isolation: "isolate" }}
            />
            <g transform="translate(571 315) scale(.5)">
              <DualCircleGroup1
                id="phone-large-circle-group"
                fillVersion="white"
                strokeVersion="white"
              />
            </g>
            <circle
              cx="583"
              cy="220"
              r="1.663"
              fill={cameraColor}
              // fill="green"
              data-name="Phone Camera"
            />
          </g>
          <path
            fill={shapeStrokeColor}
            d="M420.366 351.147a22.482 22.482 0 1 1 22.483-22.483 22.483 22.483 0 0 1-22.483 22.483zm0-44.448a21.965 21.965 0 1 0 21.966 21.965 21.965 21.965 0 0 0-21.966-21.964z"
            data-name="Large Border Outline Circle Bottom Left"
          />
        </g>
      </svg>
    </Box>
  )
}
