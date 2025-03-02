"use client"

import React, { useState } from "react"
import { TextField, Button, Paper } from "@mui/material"

const componentsArray = require("../../data/components.json")

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
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <TextField
        select
        label="Component Name"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{
          native: true,
        }}
      >
        <option aria-label="None" value="" />
        {componentsArray.map((component) => (
          <option key={component} value={component}>
            {component}
          </option>
        ))}
      </TextField>
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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCustomize}
        sx={{ marginTop: 2 }}
      >
        Add Component Variant
      </Button>
    </Paper>
  )
}

