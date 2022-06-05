import './globals.css'
import type { AppProps } from 'next/app'
// import { createMuiTheme, ThemeProvidor } from '@mui/core'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { StylesProvider } from '@mui/styles'

const theme = createTheme({
  palette: {
    neutral: {
      main: "#FFFFFF",
      light: "#FFFFFF"
    },
    primary: {
      main: "#0b132b;"
    }, 
    secondary: {
      main: "#3A506B",
      //5500E7
    },
    common: {
      black: "#000000",
      white: "#FFFFFF"
    }
  },
  typography: {
    fontFamily: "Hind Siliguri",
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightRegular: 500,
    fontWeightBold: 600,
  }
})

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// 0B132B: oxford blue
// 1C2541: space cadet
// 3A506B: lighter cadet
// 5BC0BE: maximum blue green
// White

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider>
  )
}

export default MyApp
