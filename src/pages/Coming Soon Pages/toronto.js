import { LinearProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import React, { useState, useEffect } from 'react';
import Notification from '../../components/Notifications/Notification';

const Toronto = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Notification />
      <div style={{ flex: 1 }}>
        <Container style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25%' }}>
            <Typography variant='heading1' style={{ fontSize: '2rem' }}>Challenge coming soon...!</Typography>
          </div>
          <LinearProgress sx={{ backgroundColor: "#ACB992", "& .MuiLinearProgress-bar": { backgroundColor: `#464E2E` } }} />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Toronto;
