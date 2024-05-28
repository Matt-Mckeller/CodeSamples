import { Palette } from "@mui/material/styles"

export const lightThemePalette: Palette = {
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    light: "#F7F3F9",
    // lightPrimary: '#F7F3F9',
    medium: "#939393",
    dark: "#434343", // #1C3B5C is an alternative option to try, liked it in a different environment
    backdrop: "#00000099",
    offsetBG: "#434343",
    contrastBG: "#010203",
  },
  action: {
    active: "#0000008A",
    hover: "#0000000A",
    hoverOpacity: 0.04,
    selected: "#00000015",
    selectedOpacity: 0.08,
    disabled: "#00000042",
    disabledBackground: "#0000001F",
    disabledOpacity: 0.4,
    focus: "#0000001F",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: "#010203",
    white: "#FFFFFF",
    gray: "#343434",
  },

  primary: {
    highSaturation: "#6608a1", // rgbToHex(hslToRgb("hsl(277, 91, 33)")), // #6608a1 good for CTA
    // lowSaturation: rgbToHex(hslToRgb('hsl(277, 31, 33)')), // #5a3a6e
    main: "#621890", //rgbToHex(hslToRgb("hsl(277, 71, 33)")), // #621890
    dark: "#3e105c", // rgbToHex(hslToRgb("hsl(277, 71, 21)")), // #3e105c
    light: "#a662d0", // rgbToHex(hslToRgb("hsl(277, 54, 60)")), // #a662d0
    // ALTERNATIVE LIGHT OPTION '#9966cc', // hsl(270, 50, 60)
    contrastText: "#FFFFFF",
  },
  secondary: {
    // Note: still being decided
    main: "#BF045B",
    light: "#D90479",
    dark: "#8C0343",
    // Options: #fc3162 Very vibrant, #edbaac, Shade of Blue
    contrastText: "#FFFFFF",
  },
  tertriary: {
    main: "#111B8B",
    // option "#5BDAE3", or ~"#F97236",
  },
  text: {
    primary: "#010203",
    secondary: "#838484", //lighten("#010203", 0.515),
    disabled: "rgba(0, 0, 0, 0.42)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#15051f" }, // rgbToHex(hslToRgb("hsl(277, 71, 7)"))
      { offset: 1, color: "#ffffff" }, // Default BG
    ],
    background: [
      { offset: 0, color: "#15051f" }, // rgbToHex(hslToRgb("hsl(277, 71, 7)"))
      { offset: 1, color: "#ffffff" }, // Default BG
    ],
  },
  button: {
    textButtonColor: "#010203",
  },
  error: {
    main: "#f91a4b", // rgbToHex(hslToRgb("hsl(347, 95, 54)")),
    light: "#fa5c7e", //rgbToHex(hslToRgb("hsl(347, 94, 67)")),
    dark: "#540314", // rgbToHex(hslToRgb("hsl(347, 94, 17)")),
    contrastText: "",
  },
  success: {
    // Todo: still needs verified
    main: "#09C577",
    light: "#0FD870",
    dark: "#019247",
    contrastText: "",
  },
  warning: {
    // Note: placeholder value, currently unused
    // optional orange: #F57C0F
    main: "#01f203",
    light: "#01F203",
    dark: "#01F203",
    contrastText: "",
  },
  info: {
    // Note: placeholder value, currently unused
    main: "#0102f3",
    light: "#0102f3",
    dark: "#0102f3",
  },
}

export const lightThemeShadows: any = [
  "none",
  "-3px 4px 6px #00000AAA",
  "0px 2px 4px -1px rgba(186,156,228, .2),0px 4px 5px 0px rgba(186,156,228, .14),0px 1px 10px 0px rgba(186,156,228,.12)",
  "2px 4px 6px black",
  "2px 2px 3px black",
  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  // 5
  "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
  "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
  "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
  "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
  "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
  // 10
  "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
  "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
  "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
  // 15
  "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
  "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
  "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
  "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
  "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
  // 20
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
  "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
  "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
  // Used by paper dialog
  "-8px 11px 14px - 7px rgba(0,0,0,0.2), -9px 23px 36px 3px rgba(0,0,0,0.2), 0px - 9px 44px 8px rgba(0,0,0,0.2)",
]
