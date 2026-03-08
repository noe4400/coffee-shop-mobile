import { StyleSheet } from 'react-native-unistyles'

const mainTheme = {
    colors: {
        primary: '#C67C4E',
        secondary: '#313131',
        brown: {
            light: "rgb(249, 242, 237)",
            lightHover: "rgb(246, 235, 228)",
            lightActive: "rgb(237, 214, 200)",
            normal: "rgb(198, 124, 78)",
            normalHover: "rgb(178, 112, 70)",
            normalActive: "rgb(158, 99, 62)",
            dark: "rgb(149, 93, 59)",
            darkHover: "rgb(119, 74, 47)",
            darkActive: "rgb(89, 56, 35)",
            darker: "rgb(69, 43, 27)"
        },
        grey: {
            lighter: "rgb(162, 162, 162)",
            lightHover: "rgb(144, 144, 144)",
            lightActive: "rgb(121, 121, 121)",
            normal: "rgb(49, 49, 49)",
            normalHover: "rgb(42, 42, 42)",
            normalActive: "rgb(36, 36, 36)",
            dark: "rgb(17, 17, 17)",
            darkHover: "rgb(12, 12, 12)",
            darkActive: "rgb(5, 5, 5)"
        },
        surface: {
            white: "rgb(255, 255, 255)",
            whiteHover: "rgb(249, 249, 249)",
            whiteActive: "rgb(237, 237, 237)",
            light: "rgb(249, 249, 249)",
            lightHover: "rgb(237, 237, 237)",
            lightActive: "rgb(227, 227, 227)",
            normal: "rgb(244, 244, 244)",
            normalHover: "rgb(230, 230, 230)",
            normalActive: "rgb(216, 216, 216)",
            dark: "rgb(238, 238, 238)"
        }
    },

    gap: (v: number) => v * 8
}


const appThemes = {
    light: mainTheme,
}

const breakpoints = {
    xs: 0,
    sm: 300,
    md: 500,
    lg: 800,
    xl: 1200
}

type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appThemes

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
    settings: {
        initialTheme: 'light',
    },
    breakpoints,
    themes: appThemes
})