import './App.css';
import React from 'react';
import Map from './pages/Map/Map';
import Challenges from './pages/Challenges/Challenges';
import Profile from './pages/Profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/UserMangement/Signup';
import Login from './pages/UserMangement/Login';
import SecurityQuestion from './pages/UserMangement/SecurityQuestion';
import Halifaxwave from './pages/Challenges/Halifaxwave';
import UploadImage from './pages/Challenges/UploadImage';
import ListCities from './pages/Challenges/Cities';
import Badges from './pages/Badges/Badges';
import HalifaxFortune from './pages/Coming Soon Pages/HalifaxFortune';
import HalifaxBeer from './pages/Coming Soon Pages/HalifaxBeer';  
import Halifaxlillies from './pages/Coming Soon Pages/Halifaxlillies';
import Halifaxbike from './pages/Coming Soon Pages/Halifaxbike';
import Halifaxcitadel from './pages/Coming Soon Pages/Halifaxcitadel';
import Halifaxitaly from './pages/Coming Soon Pages/Halifaxitaly';
import Halifaxtitanic from './pages/Coming Soon Pages/Halifaxtitanic';
import Ottawa from './pages/Coming Soon Pages/ottawa';
import Vancouver from './pages/Coming Soon Pages/vancouver';
import Toronto from './pages/Coming Soon Pages/toronto';
import Quebec from './pages/Coming Soon Pages/quebec';
import Winnipeg from './pages/Coming Soon Pages/winnipeg';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/map" element={<Map />} />
          <Route path='/login' element={<Login />} />
          <Route path='/securityquestion' element={<SecurityQuestion />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/halifaxwave" element={<Halifaxwave />} />
          <Route path="/halifax" element={<Challenges />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/cities" element={<ListCities />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/halifaxfortune" element={<HalifaxFortune />} />
          <Route path="/halifaxbeer" element={<HalifaxBeer />} />
          <Route path="/halifaxlillies" element={<Halifaxlillies />} />
          <Route path="/Halifaxbike" element={<Halifaxbike />} />
          <Route path="/halifaxcitadel" element={<Halifaxcitadel />} />
          <Route path="/halifaxitaly" element={<Halifaxitaly />} />
          <Route path="/Halifaxtitanic" element={<Halifaxtitanic />} />
          <Route path="/ottawa" element={<Ottawa />} />
          <Route path="/vancouver" element={<Vancouver />} />
          <Route path="/toronto" element={<Toronto />} />
          <Route path="/quebec" element={<Quebec />} />
          <Route path="/winnipeg" element={<Winnipeg />} />
        </Routes> 
      </Router>
    </div>
  );
}
export default App;
