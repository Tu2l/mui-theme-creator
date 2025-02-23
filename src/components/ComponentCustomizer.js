"use client"

import { useState } from "react"
import { TextField, Button, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function ComponentCustomizer({ onCustomize }) {
  const [componentName, setComponentName] = useState("")
  const [variantName, setVariantName] = useState("")
  const [customStyles, setCustomStyles] = useState("")

  const handleCustomize = () => {
    try {
      const stylesObject = JSON.parse(customStyles)
      onCustomize(componentName, variantName, stylesObject)
      setComponentName("")
      setVariantName("")
      setCustomStyles("")
    } catch (error) {
      alert("Invalid JSON format for custom styles")
    }
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Component Customization</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <TextField
            label="Component Name"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Variant Name"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Custom Styles (JSON)"
            value={customStyles}
            onChange={(e) => setCustomStyles(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button variant="contained" color="secondary" onClick={handleCustomize} sx={{ marginTop: 2 }}>
            Add Component Variant
          </Button>
        </Paper>
      </AccordionDetails>
    </Accordion>
  )
}

