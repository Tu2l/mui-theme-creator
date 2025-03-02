import React from 'react';
import { Paper, Typography, List, ListItem, ListItemButton, ListItemText, Collapse, Box } from '@mui/material';

export function ComponentPanel(props) {
    const {
        currentTheme,
        expandedComponent,
        handleComponentClick
    } = props

    return (
        <Paper
            elevation={3}
            sx={{ padding: 2 }}
        >
            <Typography
                variant="h6"
                gutterBottom>
                Components
            </Typography>

            <ComponentList
                components={currentTheme.components}
                expandedComponent={expandedComponent}
                handleComponentClick={handleComponentClick}
            />
        </Paper>
    )
}


export function ComponentList(props) {
    const {
        components,
        expandedComponent,
        handleComponentClick
    } = props

    return (
        <>
            {components && Object.keys(components).length > 0 ? (
                <List>
                    {Object.keys(components).map((componentName) => (
                        <Box key={componentName}>
                            <ListItemButton onClick={() => handleComponentClick(componentName)}>
                                <ListItemText primary={componentName} />
                            </ListItemButton>
                            <Collapse in={expandedComponent === componentName} timeout="auto" unmountOnExit>
                                <List component="div">
                                    {components[componentName].variants && components[componentName].variants.length > 0 ? (
                                        components[componentName].variants.map((variant, index) => (
                                            <ListItem key={index} sx={{ pl: 4 }}>
                                                <ListItemText
                                                    primary={`Variant: ${variant.props.variant}`}
                                                    secondary={`Styles: ${JSON.stringify(variant.style)}`}
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <ListItem sx={{ pl: 4 }}>
                                            <ListItemText primary="No variants defined for this component." />
                                        </ListItem>
                                    )}
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            ) : (
                <Typography>No components customized yet.</Typography>
            )}
        </>

    )
}