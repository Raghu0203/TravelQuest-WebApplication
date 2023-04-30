import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchIcon from '@mui/icons-material/Search';
import Notification from '../../components/Notifications/Notification';


import { Link } from 'react-router-dom';



export default function ListChallenges() {
    const { cityId } = useParams();
    const navigate = useNavigate();
    const [cityData, setCityData] = useState();
    const [searchChallenge, setSearchChallenge] = useState("");

    const handleSearchChallengeChange = (event) => {
        setSearchChallenge(event.target.value);
    }

    const challengeRoutes = {
        "The Wave Awaits": "Halifaxwave",
        "Find Fortune at Fortune Donuts": "Halifaxfortune",
        "Find Life in Italy at Pier 21": "Halifaxitaly",
        "Nothing beats Local Beer": "Halifaxbeer",
        "History Deep Dive: Citadel Hill": "Halifaxcitadel",
        "Lillies at Halifax Public Gardens": "Halifaxlillies",
        "Tragedy of Titanic": "Halifaxtitanic",
        "Bike ride? Sure!": "Halifaxbike",
        "Treat yoursef to a glass of wine": "Halifaxwine"

    };


    const data = [
        {
            title: "The Wave Awaits",
            number: "Challenge 1",
            id: "1",
            src: "https://www.novascotia.com/sites/default/files/2022-01/Halifax-Harbour-seadoos-1920x1080.jpg",
        },
        {
            title: "Find Fortune at Fortune Donuts",
            number: "Challenge 2",
            id: "2",
            src: "https://maritimemuseum.novascotia.ca/sites/default/files/inline/images/mmaa4950.jpg",


        },
        {
            title: "Find Life in Italy at Pier 21",
            number: "Challenge 3",
            id: "3",
            src: "https://cdn0.weddingwire.ca/vendor/8658/3_2/960/jpg/professional-shoot-2015_50_8658-157435925069113.jpeg",


        },
        {
            title: "Nothing beats Local Beer",
            number: "Challenge 4",
            id: "4",
            src: "https://media.globalnews.ca/videostatic/news/vzoqwqmtjz-05ysk1fmad/Alexander_Keiths.jpg",


        },
        {
            title: "History Deep Dive: Citadel Hill",
            number: "Challenge 5",
            id: "5",
            src: "https://hmhps.ca/images/locations/halifax-citadel/halifax-citadel-6.jpg",


        },
        {
            title: "Lillies at Halifax Public Gardens",
            number: "Challenge 6",
            id: "6",
            src: "https://www.novascotia.com/sites/default/files/2019-05/Drone%20of%20public%20gardens%20halifax%201920x1080.jpg",


        },
        {
            title: "Tragedy of Titanic",
            number: "Challenge 7",
            id: "7",
            src: "https://static01.nyt.com/images/2016/06/02/world/what-in-the-world/wit_titanic/wit_titanic-videoSixteenByNineJumbo1600.jpg",


        },
        {
            title: "Bike ride? Sure!",
            number: "Challenge 8",
            id: "8",
            src: "https://momentummag.com/wp-content/uploads/2015/09/Travel_Halifax_Halifax_Tourism.jpg",


        },
        {
            title: "Treat yourself to a glass of wine",
            number: "Challenge 9",
            id: "9",
            src: "https://www.visitnovascotiawineries.com/wp-content/uploads/2022/01/Church_Street_Winery_profile2.jpg",


        }
    ];

    const filteredChallenge = data.filter(data => {
        const title = data.title;
        return title.toLowerCase().includes(searchChallenge.toLowerCase());
    });

    //fucntion to redirect to chatwindow
    const viewChallenge = async challengeId => {
        const challengeTitle = data.find(challenge => challenge.id === challengeId)?.title;
        const route = challengeRoutes[challengeTitle];

        if (route) {
            navigate(`/${route}`);
        } else {
            toast.error('No route found for this challenge!');
        }
    };


    console.log("inside else", cityData)
    return (

        <div>
            <Notification />
            <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }} />
            <Container maxWidth="md" sx={{ mt: 3 }}>
                <Paper
                    component="form"
                    xs={12} sm={6} md={4}
                    sx={{ p: "2px 4px", display: "flex", alignItems: "center", margin: "auto", mb: 3 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Challenges"
                        value={searchChallenge}
                        onChange={handleSearchChallengeChange}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Grid container spacing={3}>
                    {
                        filteredChallenge.map((data) => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Link to={`/${challengeRoutes[data.title]}`}>


                                    <Card onClick={() => viewChallenge(data.id)} style={{ height: "200px" }} >

                                        <Box sx={{ position: 'relative' }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={data.src}
                                                    alt="profile image"
                                                />
                                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', bgcolor: 'white', opacity: '0.80', color: '#362706', padding: '10px' }}>
                                                    <Typography variant="h6">{data.number}</Typography>
                                                    <Typography variant="body2">{data.title}</Typography>
                                                </Box>
                                            </CardActionArea>
                                        </Box>
                                    </Card>
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>


            <Footer style={{ position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 1 }} />
        </div>


    )
}

