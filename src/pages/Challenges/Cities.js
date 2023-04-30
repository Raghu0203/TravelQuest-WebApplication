import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, InputBase, LinearProgress, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notifications/Notification';


import axios from 'axios';

export default function ListCities() {
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [searchCity, setSearchCity] = useState("");
    const [myCityData, setData] = useState(null);

    const handleSearchCityChange = (event) => {
        setSearchCity(event.target.value);
    }

    const challengeRoutes = {
        "The Wave Awaits": "HalifaxWave",
        "Find Fortune at Fortune Donuts": "Halifaxfortune",
        "Find Life in Italy at Pier 21": "Halifaxitaly",
        "Nothing beats Local Beer": "Halifaxbeer",
        "History Deep Dive: Citadel Hill": "Halifaxcitadel",
        "Lillies at Halifax Public Gardens": "Halifaxlillies",
        "Tragedy of Titanic": "Halifaxtitanic.js",
        "Bike ride? Sure!": "Halifaxbike.js",
        "Treat yoursef to a glass of wine": "Halifaxwine"
    };



    const data = [
        {
            title: "Halifax",
            id: "1",
            src: "https://imgs.search.brave.com/meEPoASeEQrISPl8OzOSzdWZv-hHHLxpXn1dcXEHaqU/rs:fit:724:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/UmN0OEc1bWxURFV0/dGEycTN6cllBSGFF/MiZwaWQ9QXBp"
        },
        {
            title: "Ottawa",
            id: "2",
            src: "https://imgs.search.brave.com/xpWOKvvKzyZwCqM_EV7ReU7WVbOAOMEwtg2VA1qbj5E/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJpcHNhdnZ5LmNv/bS90aG1iL2tqYndy/Y1Rkc1M0WGZ2UUFI/NE9pZXY0QXo4UT0v/NDUwMHgzMDAyL2Zp/bHRlcnM6ZmlsbChh/dXRvLDEpL3Bhcmxp/YW1lbnQtaGlsbC1p/bi1vdHRhd2EtLW9u/dGFyaW8tLWNhbmFk/YS0xMjEyMjc1OTcy/LTlmNmY2ZTQ1Y2Uw/ODRkZjg5YWFlYmY5/NzJlMTViMjdiLmpw/Zw",

        },

        {
            title: "Vancouver",
            id: "3",
            src: "https://imgs.search.brave.com/lxHVI--jds4MeFWMxMBXpzAqeEoSiXvofWmyR_TowdE/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5v/T3phVkFod1p4NC13/TDlnRFdhSlZBSGFF/NyZwaWQ9QXBp",

        },



        {
            title: "Toronto",
            id: "4",
            src: "https://imgs.search.brave.com/z8sL_vUGnYw7H1wsNIE7bWIOQjmmu0g3gQDw_MOHkpo/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dW5pdmVyc2l0eW1h/Z2F6aW5lLmNhL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzAy/L1Rvcm9udG8uanBn",

        }, {
            title: "Quebec",
            id: "5",
            src: "https://imgs.search.brave.com/X5rM6pKUxTJ7ZxyvinwnVzjNhqFQzuSuYbTPbJCxQ0Y/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC40/b3U5N0hNcnlmVVds/ZkhHWC1ibHNRSGFF/OCZwaWQ9QXBp",

        }, {
            title: "Winnipeg",
            id: "6",
            src: "https://imgs.search.brave.com/bv2ktp0avjsnG8tKQgZ27-lMv_btS7RJHg8exlOtTGk/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5s/Tm5ac0MtODBtN1Vr/RlZvcDlQQzN3SGFF/OCZwaWQ9QXBp",

        },


    ];

    const filteredCity = data.filter(data => {
        const title = data.title;
        return title.toLowerCase().includes(searchCity.toLowerCase());
    });

    const viewChallenges = (cityName) => {
        const cityUrl = `/${cityName.toLowerCase()}`;
        navigate(cityUrl);
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Notification />
            <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }} />
            <Container maxWidth="md" sx={{ mt: 3, flexGrow: 1, overflowY: "auto" }}>
                <Paper
                    component="form"
                    xs={12} sm={6} md={4}
                    sx={{ p: "2px 4px", display: "flex", alignItems: "center", margin: "auto", mb: 3 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Cities"
                        value={searchCity}
                        onChange={handleSearchCityChange}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Grid container spacing={3}>
                    {
                        filteredCity.map((data) => (
                            <Grid item xs={12} sm={6} md={4}>
                                {/* <Link to= "/challenges/" > */}
                                <Card onClick={() => viewChallenges(data.title)} style={{ height: "250px" }} >
                                    <Box sx={{ position: 'relative' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={data.src}
                                                alt="profile image"
                                            />
                                            <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', bgcolor: 'white', opacity: '0.80', color: '#362706', padding: '10px' }}>
                                                <Typography variant="h5">{data.title}</Typography>
                                            </Box>
                                        </CardActionArea>
                                    </Box>
                                </Card>
                                {/* </Link> */}
                            </Grid>
                        ))
                    }
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2%" }}>
                    <Typography variant='body1'>More destinations arriving soon...</Typography>
                </div>
                <LinearProgress sx={{ backgroundColor: "#ACB992", "& .MuiLinearProgress-bar": { backgroundColor: `#464E2E` } }} />
            </Container>
            <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} />
        </div>
    );

}
