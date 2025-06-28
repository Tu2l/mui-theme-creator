import React from 'react';
import { Paper, Typography, List, ListItem, ListItemButton, ListItemText, Collapse, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function ComponentPanel(props) {
    const {
        currentTheme,
        expandedComponent,
        handleComponentClick,
        handleEditVariant,
        handleDeleteComponent,
        handleDeleteVariant // <-- new prop
    } = props

    return (
        <Paper elevation={3} sx={{ padding: 2, height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Typography
                variant="h6"
                gutterBottom>
                Components
            </Typography>

            <ComponentList
                components={currentTheme.components}
                expandedComponent={expandedComponent}
                handleComponentClick={handleComponentClick}
                handleEditVariant={handleEditVariant}
                handleDeleteComponent={handleDeleteComponent}
                handleDeleteVariant={handleDeleteVariant} // <-- pass down
            />
        </Paper>
    )
}


export function ComponentList(props) {
    const {
        components,
        expandedComponent,
        handleComponentClick,
        handleEditVariant,
        handleDeleteComponent,
        handleDeleteVariant // <-- new prop
    } = props

    return (
        <>
            {components && Object.keys(components).length > 0 ? (
                <List>
                    {Object.keys(components).map((componentName) => (
                        <Box key={componentName}>
                            <ListItemButton onClick={() => handleComponentClick(componentName)}>
                                <ListItemText primary={componentName} />
                                <IconButton edge="end" aria-label="delete" color="error" onClick={e => { e.stopPropagation(); handleDeleteComponent(componentName) }}>
                                  <DeleteIcon />
                                </IconButton>
                            </ListItemButton>
                            <Collapse in={expandedComponent === componentName} timeout="auto" unmountOnExit>
                                <List component="div">
                                    {components[componentName].variants && components[componentName].variants.length > 0 ? (
                                        components[componentName].variants.map((variant, index) => (
                                            <ListItem key={index} sx={{ pl: 4 }}
                                              secondaryAction={
                                                <>
                                                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditVariant(componentName, variant, index)}>
                                                    <EditIcon />
                                                  </IconButton>
                                                  <IconButton edge="end" aria-label="delete-variant" color="error" onClick={() => handleDeleteVariant(componentName, index)}>
                                                    <DeleteIcon />
                                                  </IconButton>
                                                </>
                                              }
                                            >
                                                <ListItemText
                                                    primary={`Variant: ${variant.props.variant}`}
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