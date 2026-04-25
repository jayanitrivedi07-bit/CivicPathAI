const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Geocode an address or PIN code using Google Maps API
 */
const geocodeAddress = async (address) => {
  if (!API_KEY) {
    console.warn('GOOGLE_MAPS_API_KEY missing, using mock coordinates');
    return { lat: 28.6139, lng: 77.2090 };
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${address}, India`,
        key: API_KEY
      }
    });

    if (response.data.status === 'OK') {
      return response.data.results[0].geometry.location;
    }
    throw new Error(`Geocoding failed: ${response.data.status}`);
  } catch (error) {
    console.error('Maps API Error:', error.message);
    return { lat: 28.6139, lng: 77.2090 }; // Fallback
  }
};

/**
 * Generate a navigation URL
 */
const getDirectionsUrl = (lat, lng) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};

/**
 * Generate an embedded map URL for frontend iframe
 */
const getEmbedUrl = (lat, lng) => {
  if (!API_KEY) return null;
  return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${lat},${lng}&zoom=15`;
};

module.exports = {
  geocodeAddress,
  getDirectionsUrl,
  getEmbedUrl
};
