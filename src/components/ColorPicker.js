'use client'

import { Box, Stack, Typography } from "@mui/material"

export default function ColorPicker({ label, color, onChange }) {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 2,
        justifyContent: 'center'
      }}>

      <Typography fontWeight='bold' color={color} >{color}</Typography>

      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "50px",
          height: "30px",
          padding: 0,
          border: "none",
          borderRadius: 5
        }}
      />
      <Typography fontWeight='bold'>{label}</Typography>
    </Stack>
  )
}

