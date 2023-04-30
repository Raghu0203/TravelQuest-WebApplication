import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchIcon from '@mui/icons-material/Search';


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
        
      };
      

    const data = [
        {
            title: "The Wave Awaits",
            id: "1",
            src: "https://www.novascotia.com/sites/default/files/2022-01/Halifax-Harbour-seadoos-1920x1080.jpg",


        },
        {
            title: "Find Fortune at Fortune Donuts",
            id: "2",
            src: "https://maritimemuseum.novascotia.ca/sites/default/files/inline/images/mmaa4950.jpg",


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
                                    <Link to={`/${challengeRoutes[data.title]}${data.title}`}>

                                    <Button size="small" color="secondary" onClick={() => viewChallenge(data.id)}>

    View Challenge
  </Button>

                                    <Card onClick={() => viewChallenge(data.id)} style={{ height: "250px" }} >
                                        <CardActionArea>
                                            <CardMedia
                                                alignItems="center"
                                                component="img"
                                                height="150"
                                                image={data.src}
                                                alt="profile image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" align='center'> 
                                                    {data.title}

                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                        </CardActions>
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
                    
