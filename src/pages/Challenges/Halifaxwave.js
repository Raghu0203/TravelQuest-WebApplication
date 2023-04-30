import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Feedback from '../../components/Feedback/Feedback';
import Notification from '../../components/Notifications/Notification';

const Halifaxwave = () => {
  const { challengeId } = useParams();

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <Notification />
      <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }} />
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={8}>
              <Card style={{ marginBottom: '10px' }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: 32 }}>
                      The Wave Awaits
                    </Typography>
                    <hr />
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: 20 }}>
                      Attraction: Wave Formation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: Lower Water St, Halifax NS B3J 1K1
                    </Typography>
                    <hr />
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: "justify" }}>
                      The Halifax boardwalk is a sturdy structure made of heavy timber that remains open to the public round the clock.
                      The boardwalk houses various shops, including Bishop's Landing and Historic Properties, and also features the "Cable Wharf,"
                      which was once a cable ship terminal and now serves as a tour boat base. In 2010, the last tugboats, including Foundation
                      Franklin and Point Chebucto, were moved to Port Hawkesbury, ending a century-long era of tugboat operations from the tug
                      wharves at the foot of Salter Street. The pier at the foot of Sackville Street was the base for the pilot boats, which were
                      the last working vessels to operate regularly from the waterfront. However, in late 2020, their base was shifted to a wharf
                      in Dartmouth near the foot of the Macdonald Bridge. The former tug and pilotage wharves have been partially demolished and
                      refurbished to create new public facilities.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://travelmindset.s3.amazonaws.com/uploads/image/asset/1952/full_wave.jpg"
                    alt="profile image"
                  />
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      The Mighty Wave
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Water front &nbsp;|&nbsp; Halifax, Canada
                    </Typography>
                    <Button variant='outlined' style={{ borderColor: "#ACB992", color: "#362706", margin: "1%", marginTop: "2%" }} onClick={() => window.open('/map')}>
                      Find Directions
                    </Button>
                  </CardContent>

                </CardActionArea>
                <ToastContainer />


                <CardActions style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                  <Typography variant="body2" color="text.secondary">
                    Completed the challenge?
                  </Typography>
                  <Button style={{ backgroundColor: "#ACB992", color: "#362706", margin: "5px", marginBottom: "5%" }} onClick={() => window.open('/upload')}>
                    Verify Challenge
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Feedback />
          </Grid>
        </Container>

      <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} />
    </div>


  )
}

export default Halifaxwave;