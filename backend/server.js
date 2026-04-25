const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3005;

// --- SECURITY ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https://www.google.com"],
      connectSrc: ["'self'"]
    }
  }
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

// --- EFFICIENCY ---
app.use(compression()); // Compress all responses
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// --- ROUTES ---
app.use('/api', apiLimiter, apiRoutes);

// Health Check for monitoring
app.get('/health', async (req, res) => {
  let firestoreStatus = 'CONNECTED';
  try {
    const firebaseService = require('./src/services/firebaseService');
    await firebaseService.db.collection('health').limit(1).get();
  } catch (e) {
    firestoreStatus = 'DISCONNECTED';
  }

  res.json({ 
    status: 'UP', 
    timestamp: new Date().toISOString(),
    services: {
      maps: process.env.GOOGLE_MAPS_API_KEY ? 'READY' : 'MOCK_MODE',
      firestore: firestoreStatus
    }
  });
});

// Handle SPA routing (fallback to index.html)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CivicPathAI Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
