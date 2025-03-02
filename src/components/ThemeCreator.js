"use client"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material"
import ColorPicker from "./ColorPicker"
import ComponentCustomizer from "./ComponentCustomizer"
import { NewThemeModal, ThemePanel } from "./theme-panel"
import { ComponentPanel } from "./component-panel"

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
    setCurrentTheme((prevTheme) => ({
      ...prevTheme,
      palette: {
        ...prevTheme.palette,
        [colorType]: {
          ...prevTheme.palette[colorType],
          [colorKey]: color,
        },
      },
    }))

    // Update the selected theme in the themes array
    setThemes((prevThemes) =>
      prevThemes.map((theme, index) =>
        index === selectedThemeIndex ? currentTheme : theme
      )
    )
  }

  // TODO - fix - update the array properly
  const handleComponentCustomization = (componentName, variantName, styles) => {
    setCurrentTheme((prevTheme) => ({
      ...prevTheme,
      components: {
        ...prevTheme.components,
        [componentName]: {
          ...prevTheme.components[componentName],
          variants: [
            ...(prevTheme.components[componentName]?.variants || []),
            {
              props: { variant: variantName },
              style: styles,
            },
          ],
        },
      },
    }))

    // Update the selected theme in the themes array
    console.log(selectedThemeIndex)
    setThemes((prevThemes) =>
      prevThemes.map((theme, index) =>
        index === selectedThemeIndex ? currentTheme : theme
      )
    )

    console.log(currentTheme)
    console.log(themes)

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
      case 2:
        return themes.length > 0 ? (
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Theme Customization
            </Typography>
            <Divider />
            <br />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: 2,
              }}>
              <ColorPicker
                label="Primary Main"
                color={currentTheme.palette.primary.main}
                onChange={(color) => handleColorChange("primary", "main", color)} />
              <ColorPicker
                label="Primary Light"
                color={currentTheme.palette.primary.light}
                onChange={(color) => handleColorChange("primary", "light", color)} />
              <ColorPicker
                label="Primary Dark"
                color={currentTheme.palette.primary.dark}
                onChange={(color) => handleColorChange("primary", "dark", color)} />
              <ColorPicker
                label="Primary Contrast Text"
                color={currentTheme.palette.primary.contrastText}
                onChange={(color) => handleColorChange("primary", "contrastText", color)} />

              <ColorPicker
                label="Secondary Main"
                color={currentTheme.palette.secondary.main}
                onChange={(color) => handleColorChange("secondary", "main", color)} />
              <ColorPicker
                label="Secondary Light"
                color={currentTheme.palette.secondary.light}
                onChange={(color) => handleColorChange("secondary", "light", color)} />
              <ColorPicker
                label="Secondary Dark"
                color={currentTheme.palette.secondary.dark}
                onChange={(color) => handleColorChange("secondary", "dark", color)} />
              <ColorPicker
                label="Secondary Contrast Text"
                color={currentTheme.palette.secondary.contrastText}
                onChange={(color) => handleColorChange("secondary", "contrastText", color)} />

              <ColorPicker
                label="Error Main"
                color={currentTheme.palette.error.main}
                onChange={(color) => handleColorChange("error", "main", color)} />
              <ColorPicker
                label="Error Light"
                color={currentTheme.palette.error.light}
                onChange={(color) => handleColorChange("error", "light", color)} />
              <ColorPicker
                label="Error Dark"
                color={currentTheme.palette.error.dark}
                onChange={(color) => handleColorChange("error", "dark", color)} />
              <ColorPicker
                label="Error Contrast Text"
                color={currentTheme.palette.error.contrastText}
                onChange={(color) => handleColorChange("error", "contrastText", color)} />

              <ColorPicker
                label="Warning Main"
                color={currentTheme.palette.warning.main}
                onChange={(color) => handleColorChange("warning", "main", color)} />
              <ColorPicker
                label="Warning Light"
                color={currentTheme.palette.warning.light}
                onChange={(color) => handleColorChange("warning", "light", color)} />
              <ColorPicker
                label="Warning Dark"
                color={currentTheme.palette.warning.dark}
                onChange={(color) => handleColorChange("warning", "dark", color)} />
              <ColorPicker
                label="Warning Contrast Text"
                color={currentTheme.palette.warning.contrastText}
                onChange={(color) => handleColorChange("warning", "contrastText", color)} />

              <ColorPicker
                label="Info Main"
                color={currentTheme.palette.info.main}
                onChange={(color) => handleColorChange("info", "main", color)} />
              <ColorPicker
                label="Info Light"
                color={currentTheme.palette.info.light}
                onChange={(color) => handleColorChange("info", "light", color)} />
              <ColorPicker
                label="Info Dark"
                color={currentTheme.palette.info.dark}
                onChange={(color) => handleColorChange("info", "dark", color)} />
              <ColorPicker
                label="Info Contrast Text"
                color={currentTheme.palette.info.contrastText}
                onChange={(color) => handleColorChange("info", "contrastText", color)} />

              <ColorPicker
                label="Success Main"
                color={currentTheme.palette.success.main}
                onChange={(color) => handleColorChange("success", "main", color)} />
              <ColorPicker
                label="Success Light"
                color={currentTheme.palette.success.light}
                onChange={(color) => handleColorChange("success", "light", color)} />
              <ColorPicker
                label="Success Dark"
                color={currentTheme.palette.success.dark}
                onChange={(color) => handleColorChange("success", "dark", color)} />
              <ColorPicker
                label="Success Contrast Text"
                color={currentTheme.palette.success.contrastText}
                onChange={(color) => handleColorChange("success", "contrastText", color)} />

              <ColorPicker
                label="Background Default"
                color={currentTheme.palette.background.default}
                onChange={(color) => handleColorChange("background", "default", color)} />
              <ColorPicker
                label="Background Paper"
                color={currentTheme.palette.background.paper}
                onChange={(color) => handleColorChange("background", "paper", color)} />

              <ColorPicker
                label="Text Primary"
                color={currentTheme.palette.text.primary}
                onChange={(color) => handleColorChange("text", "primary", color)} />
              <ColorPicker
                label="Text Secondary"
                color={currentTheme.palette.text.secondary}
                onChange={(color) => handleColorChange("text", "secondary", color)} />
              <ColorPicker
                label="Text Disabled"
                color={currentTheme.palette.text.disabled}
                onChange={(color) => handleColorChange("text", "disabled", color)} />

              <ColorPicker
                label="Action Active"
                color={currentTheme.palette.action.active}
                onChange={(color) => handleColorChange("action", "active", color)} />
              <ColorPicker
                label="Action Hover"
                color={currentTheme.palette.action.hover}
                onChange={(color) => handleColorChange("action", "hover", color)} />
              <ColorPicker
                label="Action Selected"
                color={currentTheme.palette.action.selected}
                onChange={(color) => handleColorChange("action", "selected", color)} />
              <ColorPicker
                label="Action Disabled"
                color={currentTheme.palette.action.disabled}
                onChange={(color) => handleColorChange("action", "disabled", color)} />
              <ColorPicker
                label="Action Disabled Background"
                color={currentTheme.palette.action.disabledBackground}
                onChange={(color) => handleColorChange("action", "disabledBackground", color)} />
              <ColorPicker
                label="Action Focus"
                color={currentTheme.palette.action.focus}
                onChange={(color) => handleColorChange("action", "focus", color)} />

              <ColorPicker
                label="Divider"
                color={currentTheme.palette.divider}
                onChange={(color) => handleColorChange("divider", "", color)} />
            </Box>
          </Paper>
        ) : (
          <Typography>Please add a theme first.</Typography>
        )
      case 3:
        return themes.length > 0 ? <ComponentCustomizer onCustomize={handleComponentCustomization} /> : <Typography>Please add a theme first.</Typography>
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mb: 2,
          border: '1px solid #2196f3',
          borderRadius: 1,
          padding: 1,
        }}>

        <Button
          variant="outlined"
          disabled={activeStep === 2}
          onClick={handleBack}
          sx={{ p: 1 }}
        >
          Edit Color pallete
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />

        {activeStep !== 3 &&
          <Button
            variant="outlined"
            onClick={handleNext}>
            Edit components
          </Button>
        }

        {activeStep === 3 &&
          <Button
            variant="contained"
            color="primary"
            onClick={generateThemeJson}
            disabled={themes.length === 0}
          >
            Generate Themes JSON
          </Button>}
      </Box>

      <Box
        sx={{
          display: 'grid',
          minHeight: 800,
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 2fr 0.6fr',
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