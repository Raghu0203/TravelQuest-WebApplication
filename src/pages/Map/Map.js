//AIzaSyDFo3gUdfB1tp0A4haOHAMUfxeFFDG7gBo

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Loader } from '@googlemaps/js-api-loader';
import Notification from '../../components/Notifications/Notification';


const Map = () => {
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_API_KEY',
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 44.6488, lng: -63.5752 }, // Halifax location
        zoom: 12,
      });

      setMap(map);

      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
      });

      setDirectionsRenderer(directionsRenderer);

      const searchBox = new window.google.maps.places.SearchBox(
        document.getElementById('search-box')
      );

      setSearchBox(searchBox);

      // Add event listener for search box
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        const bounds = new window.google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry');
            return;
          }

          bounds.extend(place.geometry.location);
        });

        map.fitBounds(bounds);
      });

      // Add marker for current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const marker = new window.google.maps.Marker({
            position: currentLocation,
            map,
            title: 'Current Location',
          });

          setCurrentLocationMarker(marker);

          map.panTo(currentLocation);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }, []);

  return (
    
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <Notification />
      <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }} />
      <div id="map" style={{ height: 'calc(100vh - 120px)', width: '100%' }}></div>
      <div id="search-container" style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
    <input id="search-box" type="text" placeholder="Search for places or addresses" style={{ width: '500px', maxWidth: '90%' }} />
    <button onClick={() => {
        const origin = new window.google.maps.LatLng(44.6488, -63.5752); // Halifax location
        const destination = searchBox.getPlaces()[0].geometry.location;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocationMarker.getPosition().lat()},${currentLocationMarker.getPosition().lng()}&destination=${destination.lat()},${destination.lng()}&travelmode=walking`;
        window.open(url, '_blank');
    }}>Get Directions</button>
    </div>
      <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} />
    </div>
  );

};

export default Map;
