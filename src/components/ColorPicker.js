'use client'

import { Box, Typography } from "@mui/material"

export default function ColorPicker({ label, color, onChange }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
      <Typography sx={{ marginRight: 2, minWidth: 150 }}>{label}:</Typography>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "50px", height: "30px", padding: 0, border: "none" }}
      />
      <Typography sx={{ marginLeft: 1}}>{color}</Typography>
    </Box>
  )
}

