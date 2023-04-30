import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <AppBar position="sticky" sx={{backgroundColor: "#464E2E"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TravelExploreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap component={Link} to="/cities" // Add Link and to props here
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 600, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
                        TRAVELQUEST
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu sx={{ display: { xs: 'block', md: 'none' } }}>
                            <MenuItem>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0, backgroundColor: "white" }}
                            component={Link} // Add Link and to props here
                            to="/profile" // Set to the home path
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
