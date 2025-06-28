"use client"

import React, { useState } from "react"
import { TextField as MuiTextField, Button as MuiButton, Paper as MuiPaper } from "@mui/material"
import { TextField, Button, Paper, Typography, Box, Switch, FormControlLabel, Grid, MenuItem } from "@mui/material"
import componentAttributes from "../../data/component-attributes.json"

const componentsArray = require("../../data/components.json")

export default function ComponentCustomizer({ onCustomize, editComponent, currentVariants }) {
  const [componentName, setComponentName] = useState("")
  const [variantName, setVariantName] = useState("")
  const [customStyles, setCustomStyles] = useState("{}")
  const [parsedStyles, setParsedStyles] = useState({})
  const [jsonError, setJsonError] = useState("")
  const [useForm, setUseForm] = useState(true)
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})

  // Reset form when theme changes (componentName, variantName, customStyles, formValues, formErrors)
  React.useEffect(() => {
    setComponentName("")
    setVariantName("")
    setCustomStyles("{}")
    setFormValues({})
    setFormErrors({})
  }, [currentVariants])

  // Pre-fill form when editing
  React.useEffect(() => {
    if (editComponent) {
      setComponentName(editComponent.componentName || "")
      setVariantName(editComponent.variant?.props?.variant || "")
      setFormValues(editComponent.variant?.style || {})
      setCustomStyles(
        editComponent.variant?.style
          ? JSON.stringify(editComponent.variant.style, null, 2)
          : ""
      )
    }
  }, [editComponent])

  // Live parse customStyles
  React.useEffect(() => {
    if (!customStyles) {
      setParsedStyles({})
      setJsonError("")
      return
    }
    try {
      setParsedStyles(JSON.parse(customStyles))
      setJsonError("")
    } catch (e) {
      setParsedStyles({})
      setJsonError("Invalid JSON")
    }
  }, [customStyles])

  // Sync form values to customStyles JSON
  React.useEffect(() => {
    if (useForm) {
      // Only update JSON if at least one field is filled
      const hasValue = Object.values(formValues).some(Boolean)
      if (hasValue) {
        setCustomStyles(JSON.stringify(
          Object.fromEntries(Object.entries(formValues).filter(([_, v]) => v !== "")),
          null,
          2
        ))
      }
    }
    // eslint-disable-next-line
  }, [formValues, useForm])

  // Sync JSON to form fields (if switching to form mode)
  React.useEffect(() => {
    if (useForm && customStyles) {
      try {
        const parsed = JSON.parse(customStyles)
        setFormValues((prev) => ({ ...prev, ...parsed }))
      } catch {}
    }
    // eslint-disable-next-line
  }, [useForm])

  // Helper to render a preview of the selected component
  const renderPreview = () => {
    if (!componentName) {
      return <Typography color="text.secondary">Select a component to preview.</Typography>
    }
    if (jsonError) {
      return <Typography color="error">Cannot preview: Invalid JSON</Typography>
    }

    // Map component names to MUI components
    const componentMap = {
      Button: MuiButton,
      TextField: MuiTextField,
      Paper: MuiPaper,
      Box: Box,
      // Add more mappings as needed
    }
    const PreviewComponent = componentMap[componentName] || Box

    // Default props for demo
    const demoProps = {
      Button: {
        variant: "contained",
        color: "primary",
        children: variantName ? `${variantName} Button` : "Sample Button"
      },
      TextField: {
        label: variantName || "Sample TextField",
        defaultValue: "Preview",
        fullWidth: true
      },
      Paper: {
        elevation: 2,
        children: <Typography>Sample Paper {variantName && `(${variantName})`}</Typography>
      },
      Box: {
        children: <Typography>Sample Box {variantName && `(${variantName})`}</Typography>
      }
    }

    return (
      <Box sx={{ mt: 2, p: 2, border: '1px dashed #aaa' }}>
        <Typography variant="subtitle1" gutterBottom>
          {componentName} {variantName && `(${variantName})`} Preview
        </Typography>
        <PreviewComponent sx={parsedStyles} {...(demoProps[componentName] || {})} />
      </Box>
    )
  }

  // Validation logic for variant name and styles
  const validate = () => {
    const errors = {}
    // Variant name: must be non-empty, valid CSS identifier, and not reserved (e.g. 'default', 'inherit')
    if (!variantName || !/^[_a-zA-Z][_a-zA-Z0-9-]*$/.test(variantName)) {
      errors.variantName = "Variant name must be a valid CSS identifier (letters, numbers, -, _, no spaces, cannot start with a number)."
    } else if (["default", "inherit", "initial", "unset"].includes(variantName)) {
      errors.variantName = "Variant name cannot be a reserved CSS keyword."
    } else if (currentVariants && currentVariants.some(v => v.props.variant === variantName && (!editComponent || editComponent.variant?.props?.variant !== variantName))) {
      errors.variantName = "Variant name already exists for this component."
    }
    // Component name: must be selected
    if (!componentName) {
      errors.componentName = "Component is required."
    }
    // Custom styles: must be valid JSON and not empty
    if (!customStyles) {
      errors.customStyles = "Custom styles are required."
    } else {
      try {
        const parsed = JSON.parse(customStyles)
        if (typeof parsed !== "object" || Array.isArray(parsed)) {
          errors.customStyles = "Custom styles must be a valid JSON object."
        }
      } catch {
        errors.customStyles = "Custom styles must be valid JSON."
      }
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCustomize = () => {
    if (!validate()) return
    try {
      const stylesObject = JSON.parse(customStyles)
      onCustomize(componentName, variantName, stylesObject)
      setComponentName("")
      setVariantName("")
      setCustomStyles("{}")
      setFormValues({})
      setFormErrors({})
    } catch (error) {
      setFormErrors({ customStyles: "Invalid JSON format for custom styles" })
    }
  }

  // Helper to get attributes for selected component
  const getComponentAttributes = () => {
    if (!componentName) return []
    return componentAttributes[componentName] || []
  }

  // Helper to render dynamic form fields
  const renderDynamicFields = () => {
    const attrs = getComponentAttributes()
    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {attrs.map(attr => {
          const value = formValues[attr.name] ?? ""
          switch (attr.type) {
            case "select":
              return (
                <Grid item xs={6} key={attr.name}>
                  <TextField
                    select
                    label={attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}
                    value={value}
                    onChange={e => setFormValues(f => ({ ...f, [attr.name]: e.target.value }))}
                    fullWidth
                    SelectProps={{ native: false }}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {attr.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )
            case "boolean":
              return (
                <Grid item xs={6} key={attr.name}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!value}
                        onChange={e => setFormValues(f => ({ ...f, [attr.name]: e.target.checked }))}
                      />
                    }
                    label={attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}
                  />
                </Grid>
              )
            case "color":
              return (
                <Grid item xs={6} key={attr.name}>
                  <TextField
                    label={attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}
                    type="color"
                    value={value || "#000000"}
                    onChange={e => setFormValues(f => ({ ...f, [attr.name]: e.target.value }))}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              )
            case "number":
              return (
                <Grid item xs={6} key={attr.name}>
                  <TextField
                    label={attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}
                    type="number"
                    value={value}
                    onChange={e => setFormValues(f => ({ ...f, [attr.name]: e.target.value }))}
                    fullWidth
                    inputProps={{ min: attr.min, max: attr.max }}
                  />
                </Grid>
              )
            default:
              return (
                <Grid item xs={6} key={attr.name}>
                  <TextField
                    label={attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}
                    value={value}
                    onChange={e => setFormValues(f => ({ ...f, [attr.name]: e.target.value }))}
                    fullWidth
                  />
                </Grid>
              )
          }
        })}
      </Grid>
    )
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      {/* Show all validation errors at the top if any */}
      {Object.values(formErrors).length > 0 && (
        <Box sx={{ mb: 2 }}>
          {Object.entries(formErrors).map(([key, error]) =>
            error ? (
              <Typography key={key} color="error" variant="body2" sx={{ fontWeight: 500 }}>
                {error}
              </Typography>
            ) : null
          )}
        </Box>
      )}
      <FormControlLabel
        control={<Switch checked={useForm} onChange={() => setUseForm((v) => !v)} />}
        label={useForm ? "Use Form" : "Use JSON"}
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Component Name"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{
          native: false,
        }}
        error={!!formErrors.componentName}
        helperText={formErrors.componentName || ""}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {componentsArray.map((component) => (
          <MenuItem key={component} value={component}>
            {component}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Variant Name"
        value={variantName}
        onChange={(e) => setVariantName(e.target.value)}
        fullWidth
        margin="normal"
        error={!!formErrors.variantName}
        helperText={formErrors.variantName || ""}
      />
      {useForm ? (
        renderDynamicFields()
      ) : (
        <TextField
          label="Custom Styles (JSON)"
          value={customStyles}
          onChange={(e) => setCustomStyles(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          error={!!formErrors.customStyles || !!jsonError}
          helperText={formErrors.customStyles || jsonError || ""}
        />
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCustomize}
        sx={{ marginTop: 2 }}
      >
        {editComponent ? "Update Component" : "Add Component Variant"}
      </Button>
      {/* Live Preview Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Live Preview
        </Typography>
        {renderPreview()}
      </Box>
    </Paper>
  )
}

