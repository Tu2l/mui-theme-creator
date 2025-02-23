'use client'

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import ThemeCreator from "../components/ThemeCreator"

const defaultTheme = createTheme()

export default function Home() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ThemeCreator />
    </ThemeProvider>
  )
}
