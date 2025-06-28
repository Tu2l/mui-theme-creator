import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


export default function ControlPanel(props) {
    const { activeStep, handleBack, handleNext, generateThemeJson, themes } = props
    return (
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
        {"<"} Edit Color pallete
        </Button>
        <Box sx={{ flex: '1 1 auto', display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontWeight: 600, fontSize: 20 }}>MUI Theme Creator</span>
          </Box>
        </Box>
        {/* Right side buttons */}
        {activeStep !== 3 &&
          <Button
            variant="outlined"
            onClick={handleNext}>
            Edit components {">"}
          </Button>}
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
    )
  }