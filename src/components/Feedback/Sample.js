import { CardContent, CardHeader, Container, IconButton, Paper, Rating, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Sample() {
    return (
        <Container>
            <Paper elevation={5} sx={{ marginBottom: "1%" }}>
                <CardHeader
                    avatar={
                        <AccountCircleIcon />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Michelle Strikes"
                    subheader="January 09, 2023"
                />
                <CardContent sx={{ paddingTop: "0" }}>
                    <Rating name="read-only" value={4} readOnly />
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </CardContent>
            </Paper>
            <Paper elevation={5} sx={{ marginBottom: "1%" }}>
                <CardHeader
                    avatar={
                        <AccountCircleIcon />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Lauren Jones"
                    subheader="March 10, 2023"
                />
                <CardContent sx={{ paddingTop: "0" }}>
                    <Rating name="read-only" precision={0.5} value={3.5} readOnly />
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </CardContent>
            </Paper>
        </Container>
    )
}
