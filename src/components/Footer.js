import React from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#E9E5D6', padding: '0.5%', position: "relative", left: 0, bottom: 0, marginTop: "2%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", backgroundColor: "#E9E5D6" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TravelExploreIcon style={{ height: "2rem" }} />
                    <span>
                        <Typography variant="h6" noWrap component="a" href="/"
                            sx={{ display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 400, color: 'inherit', textDecoration: 'none' }}>
                            TRAVELQUEST
                        </Typography>
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span>All Rights Reserved &copy; 2023</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "5rem" }}>
                    <Tooltip title="Twitter">
                        <IconButton sx={{ p: 0, backgroundColor: "#E9E5D6" }}>
                            <TwitterIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Faceboook">
                        <IconButton sx={{ p: 0, backgroundColor: "#E9E5D6" }}>
                            <FacebookIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Instagram">
                        <IconButton sx={{ p: 0, backgroundColor: "#E9E5D6" }}>
                            <InstagramIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </footer>
    );
}

export default Footer