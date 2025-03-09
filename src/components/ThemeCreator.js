"use client"
import { useState } from "react"
import {
  Box,
  Typography,
  Button,
} from "@mui/material"
import ComponentCustomizer from "./ComponentCustomizer"
import { NewThemeModal, ThemePanel } from "./theme-panel"
import { ComponentPanel } from "./component-panel"
import ColorCustomizer from "./ColorCustomizer"
import ControlPanel from "./ControlPanel"

const initialTheme = {
  name: "",
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff"
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#fff"
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff"
    },
    success: {
      main: "#4caf50",
      light: "#81c881",
      dark: "#388e3c",
      contrastText: "#fff"
    },
    background: {
      default: "#fff",
      paper: "#f5f5f5"
    },
    text: {
      primary: "#333",
      secondary: "#757575",
      disabled: "#bdbdbd"
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      focus: "rgba(0, 0, 0, 0.12)"
    },
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#d5d5d5",
      "A200": "#aaaaaa",
      "A400": "#666666",
      "A700": "#333333"
    },
    divider: "rgba(0, 0, 0, 0.12)",
    tonalOffset: 0.2,
    contrastThreshold: 3,
    common: {
      black: "#000",
      white: "#fff"
    }
  },
  components: {},
}

export default function ThemeCreator() {
  const [themes, setThemes] = useState([])
  const [themeType, setThemeType] = useState("light")
  const [currentTheme, setCurrentTheme] = useState({ ...initialTheme, name: "New Theme", palette: { ...initialTheme.palette, mode: themeType } })
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(-1)
  const [newThemeName, setNewThemeName] = useState("")
  const [oldThemeName, setOldThemeName] = useState("")
  const [newThemeNameConflict, setNewThemeNameConflict] = useState(false)
  const [activeStep, setActiveStep] = useState(2)
  const [expandedComponent, setExpandedComponent] = useState(null)
  const [openNewThemeModal, setOpenNewThemeModal] = useState(false)


  const handleColorChange = (colorType, colorKey, color) => {
    console.log(colorType, colorKey, color)
    // Update the current theme immediately
    setCurrentTheme((prevTheme) => {
      const updatedTheme = {
        ...prevTheme,
        palette: {
          ...prevTheme.palette,
          ...(colorType === "divider"
            ? { [colorType]: color }
            : {
              [colorType]: {
                ...prevTheme.palette[colorType],
                [colorKey]: color,
              },
            }),
        },
      }
      // Update the themes array with the updated theme
      setThemes((prevThemes) =>
        prevThemes.map((theme, index) =>
          index === selectedThemeIndex ? updatedTheme : theme
        )
      )
      return updatedTheme
    })
  }

  const handleComponentCustomization = (componentName, variantName, styles) => {
    setCurrentTheme((prevTheme) => {
      const updatedComponents = { ...prevTheme.components }
      if (!updatedComponents[componentName]) {
        updatedComponents[componentName] = { variants: [] }
      }
      const existingVariants = updatedComponents[componentName].variants || []

      const variantIndex = existingVariants.findIndex(
        (variant) => variant.props.variant === variantName
      )

      if (variantIndex > -1) {
        existingVariants[variantIndex] = { props: { variant: variantName }, style: styles }
      } else {
        existingVariants.push({
          props: { variant: variantName },
          style: styles,
        })
      }

      updatedComponents[componentName] = {
        ...updatedComponents[componentName],
        variants: existingVariants,
      }
      setThemes((prevThemes) =>
        prevThemes.map((theme, index) =>
          index === selectedThemeIndex ? {
            ...prevTheme,
            components: updatedComponents,
          } : theme
        )
      )
      return {
        ...prevTheme,
        components: updatedComponents,
      }
    })

  }

  const handleDeleteTheme = (index) => {
    if (window.confirm("Are you sure you want to delete this theme?")) {
      setThemes((prevThemes) => prevThemes.filter((theme, i) => i !== index))
      if (index < selectedThemeIndex) {
        setSelectedThemeIndex(selectedThemeIndex - 1)
      } else if (index === selectedThemeIndex) {
        setSelectedThemeIndex(-1)
        setCurrentTheme(initialTheme)
      }
    }
  }

  const handleAddTheme = () => {
    if (newThemeName.trim() !== "") {
      const theme = { ...initialTheme, name: newThemeName, palette: { ...initialTheme.palette, mode: themeType } }
      setThemes((prevTheme) => [...prevTheme, theme])
      if (selectedThemeIndex === -1) {
        setSelectedThemeIndex(0)
        setCurrentTheme(theme)
      }
    }

    setNewThemeName("")
    // console.log(themes)
  }

  const handleSelectTheme = (index) => {
    setSelectedThemeIndex(index)
    setCurrentTheme(themes[index])
    // console.log(currentTheme)
  }

  const handleThemeUpdate = (originalName, newName, newMode) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) => {
        if (theme.name === originalName) {
          return {
            ...theme,
            name: newName,
            palette: {
              ...theme.palette,
              mode: newMode,
            },
          }
        }
        return theme
      })
    )

    setCurrentTheme(themes[selectedThemeIndex])
    setOldThemeName("")
    setNewThemeName("")
  }

  const handleNewThemeNameChange = (event) => {
    if (themes.some((theme) => theme.name === event.target.value)) {
      setNewThemeNameConflict(true)
    } else {
      setNewThemeNameConflict(false)
    }
    setNewThemeName(event.target.value)
  }

  const shouldDisableAddButton = () => {
    return !newThemeName || newThemeName.trim() === "" || newThemeNameConflict
  }

  const generateThemeJson = () => {
    console.log(themes)
    const jsonString = JSON.stringify(themes, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mui-themes.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 2: return (
        <ColorCustomizer
          isThemesAvailable={themes.length > 0}
          currentTheme={currentTheme}
          handleColorChange={handleColorChange} />
      )
      case 3: return themes.length > 0 ?
        <ComponentCustomizer
          onCustomize={handleComponentCustomization} />
        : <Typography>Please add a theme first.</Typography>
      default:
        return "Unknown step"
    }
  }

  const handleComponentClick = (componentName) => {
    setExpandedComponent((prev) => (prev === componentName ? null : componentName))
  }

  const handleOpenNewThemeModal = () => {
    setOpenNewThemeModal(true)
  }

  const handleCloseNewThemeModal = () => {
    setOpenNewThemeModal(false)
    setNewThemeName("")
    setNewThemeNameConflict(false)
    setThemeType("light")
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <NewThemeModal
        openNewThemeModal={openNewThemeModal}
        handleCloseNewThemeModal={handleCloseNewThemeModal}
        newThemeName={newThemeName}
        handleNewThemeNameChange={handleNewThemeNameChange}
        newThemeNameConflict={newThemeNameConflict}
        themeType={themeType}
        setThemeType={setThemeType}
        handleAddTheme={handleAddTheme}
        handleThemeUpdate={handleThemeUpdate}
        shouldDisableAddButton={shouldDisableAddButton}
        oldThemeName={oldThemeName}
        themes={themes} />

      <ControlPanel
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        generateThemeJson={generateThemeJson}
        themes={themes}
      />

      <Box
        sx={{
          display: 'grid',
          minHeight: 800,
          gridTemplateColumns: {
            xs: '1fr',
            md: '0.6fr 2fr 0.6fr',
          },
          gap: 3,
        }}>

        <ThemePanel
          themes={themes}
          selectedThemeIndex={selectedThemeIndex}
          handleSelectTheme={handleSelectTheme}
          handleDeleteTheme={handleDeleteTheme}
          setOldThemeName={setOldThemeName}
          setNewThemeName={setNewThemeName}
          setThemeType={setThemeType}
          setOpenNewThemeModal={setOpenNewThemeModal}
          handleOpenNewThemeModal={handleOpenNewThemeModal} />

        {getStepContent(activeStep)}

        <ComponentPanel
          currentTheme={currentTheme}
          expandedComponent={expandedComponent}
          handleComponentClick={handleComponentClick}
        />
      </Box>
    </Box>
  )
}
