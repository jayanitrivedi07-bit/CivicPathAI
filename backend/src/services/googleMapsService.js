// Service to interact with Google Maps API
// In production, this would use @googlemaps/google-maps-services-js

const geocodeAddress = async (address) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.warn('GOOGLE_MAPS_API_KEY missing, using mock geocoder');
    // Return mock coordinates for simulation
    return { lat: 28.6139, lng: 77.2090 };
  }

  // Real implementation would go here
  return { lat: 28.6139, lng: 77.2090 };
};

const getDirectionsUrl = (lat, lng) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};

module.exports = {
  geocodeAddress,
  getDirectionsUrl
};
