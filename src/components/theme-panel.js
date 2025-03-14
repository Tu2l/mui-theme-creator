import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    InputLabel
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Error as ErrorIcon, Height } from "@mui/icons-material"


export function ThemePanel(props) {
    const {
        themes,
        selectedThemeIndex,
        handleSelectTheme,
        handleDeleteTheme,
        setOldThemeName,
        setNewThemeName,
        setThemeType,
        setOpenNewThemeModal, handleOpenNewThemeModal } = props
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <ThemePanelHeader handleOpenNewThemeModal={handleOpenNewThemeModal} />

            {themes.length > 0 ? (
                <ThemePanelContent
                    themes={themes}
                    selectedThemeIndex={selectedThemeIndex}
                    handleSelectTheme={handleSelectTheme}
                    handleDeleteTheme={handleDeleteTheme}
                    setOldThemeName={setOldThemeName}
                    setNewThemeName={setNewThemeName}
                    setThemeType={setThemeType}
                    setOpenNewThemeModal={setOpenNewThemeModal}
                />
            ) : (
                <Typography>No themes added yet. Click the Add button to create your first theme!</Typography>
            )}
        </Paper>
    )
}

export function ThemePanelHeader({ handleOpenNewThemeModal }) {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                        <TableCell>
                            <Typography variant="h6" gutterBottom>
                                All Themes
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" onClick={handleOpenNewThemeModal}>
                                + Add
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function ThemePanelContent(props) {
    const {
        themes,
        selectedThemeIndex,
        handleSelectTheme,
        handleDeleteTheme,
        setOldThemeName,
        setNewThemeName,
        setThemeType,
        setOpenNewThemeModal
    } = props

    const getThemeSelectedStyle = (index) => {
        return {
            fontWeight: selectedThemeIndex === index ? 'bold' : 'normal',
            p: 1,
            '&:hover': {
                cursor: 'pointer',
            },
            ...(selectedThemeIndex === index && {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                border: '2px solid #2196f3',
            }),
        }
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {themes.map((theme, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                borderLeft: selectedThemeIndex === index ? '2px solid #2196f3' : 'none',
                                ...getThemeSelectedStyle(index),
                            }}
                        >
                            <TableCell
                                onClick={() => handleSelectTheme(index)}
                            >
                                {theme.name}
                            </TableCell>
                            <TableCell
                                onClick={() => handleSelectTheme(index)}
                            >
                                {theme.palette.mode}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    size="small"
                                    variant="outlined"
                                    onClick={
                                        () => {
                                            setOldThemeName(themes[index].name)
                                            setNewThemeName(themes[index].name)
                                            setThemeType(themes[index].palette.mode)
                                            setOpenNewThemeModal(true)
                                        }
                                    }
                                    sx={{ marginRight: 1 }}
                                >
                                    <EditIcon color="primary" />
                                </IconButton>

                                <IconButton
                                    size="small"
                                    color="warning"
                                    disabled={selectedThemeIndex === index}
                                    onClick={() => handleDeleteTheme(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function NewThemeModal(props) {
    const {
        openNewThemeModal,
        handleCloseNewThemeModal,
        newThemeName,
        handleNewThemeNameChange,
        newThemeNameConflict,
        themeType,
        setThemeType,
        handleAddTheme,
        handleThemeUpdate,
        shouldDisableAddButton,
        oldThemeName,
        themes
    } = props

    return (
        <Modal
            open={openNewThemeModal}
            onClose={handleCloseNewThemeModal}
            aria-labelledby="new-theme-modal-title"
            aria-describedby="new-theme-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '1px solid #cacaca',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
            }}>
                <Typography id="new-theme-modal-title" variant="h6" component="h2">
                    {(!oldThemeName || oldThemeName.trim() === "") ? 'Add New Theme' : 'Edit Theme'}
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="theme-name"
                    label="Theme Name"
                    type="text"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    value={newThemeName}
                    onChange={handleNewThemeNameChange}
                    error={newThemeNameConflict}
                />
                {newThemeNameConflict &&
                    <Typography
                        variant="p"
                        sx={{
                            color: 'red',
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid red',
                            marginBottom: 2,
                            padding: 1,
                            borderRadius: 1
                        }} gutterBottom>
                        <ErrorIcon sx={{ marginRight: 1 }} /> Theme with this name already exists
                    </Typography>}
                <InputLabel id="theme-type-label">Theme Type</InputLabel>
                <Select
                    labelId="theme-type-label"
                    id="theme-type"
                    value={themeType}
                    label="Theme Type"
                    onChange={(e) => setThemeType(e.target.value)}
                    fullWidth
                    margin="dense"
                >
                    <MenuItem value={"light"}>Light</MenuItem>
                    <MenuItem value={"dark"}>Dark</MenuItem>
                </Select>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleCloseNewThemeModal} sx={{ mr: 1 }}>Cancel</Button>
                    <Button
                        onClick={() => {
                            if (!oldThemeName || oldThemeName.trim() === "") {
                                handleAddTheme()
                            } else {
                                handleThemeUpdate(oldThemeName, newThemeName, themeType)
                                console.log(themes)
                            }
                            handleCloseNewThemeModal()
                        }}
                        variant="contained"
                        disabled={shouldDisableAddButton()}
                    >
                        {(!oldThemeName || oldThemeName.trim() === "") ? 'Add Theme' : 'Update Theme'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}