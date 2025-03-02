import React from 'react';
import { Paper, Typography, Divider, Box } from '@mui/material';
import ColorPicker from './ColorPicker';

export default function ColorCustomizer(props) {
    const { isThemesAvailable, currentTheme, handleColorChange } = props;
    return isThemesAvailable ? (
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
                Color Pallete Customization for <strong>{currentTheme.name}</strong> theme
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
}