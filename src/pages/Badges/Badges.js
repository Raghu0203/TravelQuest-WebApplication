import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Box,
  Badge,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Table,
  TableRow,
  TableBody,
  IconButton,
  Tooltip,
  Paper,
  Divider,
} from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import one from './1.jpg';
import two from './2.jpg';
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import three from './3.jpg';
import { Link } from "react-router-dom";

import {
  FacebookIcon,
  TwitterIcon,
  
} from "react-share";
import Notification from '../../components/Notifications/Notification';

const Badges = () => {
  const AWS = require("aws-sdk");
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");

  const [cookies, setCookies] = useCookies(["Email"]);

  useEffect(() => {
    // Fetch user profile information from cookies not local storage
    setFullName(cookies.name);
    setWebsite(cookies.email);
    console.log(cookies.email);
  }, []);

  useEffect(() => {
    console.log(website);
    if (website) {
      const dynamodb = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-2",
      });
      const params = {
        TableName: "TravelQuest_UserTable",
        Key: {
          email: { S: website },
        },
      };
      dynamodb.getItem(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          setChallengesCompleted(Number(data.Item.challengesCompleted.N));
          console.log(data.Item.challengesCompleted.N);
        }
      });
    }
  }, [website]);

  const badgeImages = () => {
    if (challengesCompleted >= 100) {
      return [two, three, one];
    } else if (challengesCompleted >= 50) {
      return [two, three];
    } else if (challengesCompleted >= 25) {
      return [two];
    } else {
      return [
        "https://via.placeholder.com/250x250.png?text=Complete+more+challenges",
      ];
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Notification />
      <Header />
      <Box flexGrow={1} pt={8}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Your Badges
                </Typography>
                <Divider />
                <Typography variant="subtitle1" gutterBottom>
                  You have completed {challengesCompleted} challenges!
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "" }}>
                  {badgeImages().map((image, index) => (
                    <Card key={index} sx={{ width: "250px" }}>
                      <CardMedia
                        sx={{ height: "250px", objectFit: "contain" }}
                        image={image}
                      />
                      <CardContent style={{ textAlign: "center" }}>
                        <Tooltip title="Share on Facebook">
                          <IconButton href="https://www.facebook.com">
                            <FacebookIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Share on Twitter">
                          <IconButton href="https://www.twitter.com">
                            <TwitterIcon />
                          </IconButton>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Box mt={2}>
                  <Typography variant="subtitle1">Earn more badges:</Typography>
                  <Button variant="contained" color="primary" href="/cities">
                    Try new challenges
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );

};

export default Badges;