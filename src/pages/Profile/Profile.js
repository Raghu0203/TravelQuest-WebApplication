import "./Profile.css";
import profileImg from "./Images/Profile.png";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Avatar, Typography, Button, Box, Badge, Container, Grid, Card, CardActionArea, CardContent, Table, TableRow, TableBody, IconButton, TableCell, Tooltip } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from "../../components/Header";

import Footer from "../../components/Footer";

const Profile = () => {
  const [cookies, setCookies] = useCookies(["Email"]);

  

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [badgeCount, setBadgeCount] = useState(1);

  useEffect(() => {
    // Fetch user profile information from cookies not local storage
    setFullName(cookies.name);
    setWebsite(cookies.email);
  }, []); 

 const deleteCookies = () => {
  console.log("Deleting cookies");  
  setCookies("email", "", { path: "/", maxAge: 0 });
  setCookies("name", "", { path: "/", maxAge: 0 });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ zIndex: 1 }} />
      <Box flexGrow={1} p={3}>
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                    <Avatar
                      alt={fullName}
                      src={profileImg}
                      sx={{ width: 128, height: 128, marginBottom: 2 }}
                    />
                  </div>
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                      <a href={"mailto:" + website} target="_blank">
                        {website}
                      </a>
                    </Typography>
                    <Link to="/badges" style={{ textDecoration: "none" }}>
                      <Badge badgeContent={badgeCount} color="primary">
                        <Button variant="outlined" sx={{ width: "180px" }}>
                          Badges
                        </Button>
                      </Badge>
                    </Link>
                    <Button variant="outlined" sx={{ width: "180px", mt: 2, mb: 2 }}>
                      Subscriptions
                    </Button>

                    <Link to="/login" style={{ textDecoration: "none" }}>
                      
                    <Button variant="outlined" sx={{ width: "180px" }} onClick={deleteCookies}>
  Logout
</Button>
                    </Link>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Card>
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2%" }}>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                      Profile
                    </Typography>
                    
                  </div>
                  <hr />
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{fullName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{website}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Password</TableCell>
                        <TableCell>********</TableCell>
                      </TableRow>
                      
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

      <Footer style={{ zIndex: 1, flexShrink: 0 }} />
    </div>
  );
};

export default Profile;
