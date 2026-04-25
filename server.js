const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- MOCK DATABASE ---
const db = {
  booths: [
    { booth_id: 'B001', name: 'Govt. Primary School, Sector 4', address: 'Sector 4, New Delhi - 110001', lat: 28.6139, lng: 77.2090, constituency: 'New Delhi', state: 'Delhi' },
    { booth_id: 'B002', name: 'Community Hall, Andheri East', address: 'Andheri East, Mumbai - 400069', lat: 19.1136, lng: 72.8697, constituency: 'Mumbai North West', state: 'Maharashtra' }
  ],
  voters: [
    { epic_number: 'ABC1234567', name: 'Rahul Sharma', dob: '1990-05-15', constituency: 'New Delhi', status: 'ACTIVE', polling_booth_id: 'B001' },
    { epic_number: 'XYZ9876543', name: 'Priya Patel', dob: '1988-11-20', constituency: 'Mumbai North West', status: 'ACTIVE', polling_booth_id: 'B002' }
  ],
  reminders: []
};

// --- SERVICES / API ENDPOINTS ---

// 1. Timeline Config
app.get('/api/timeline', (req, res) => {
  res.json({
    timeline: [
      { id: 1, title: 'Voter Registration', description: 'Closes 10 days before polling', status: 'completed' },
      { id: 2, title: 'Candidate Nominations', description: 'Currently in progress', status: 'active' },
      { id: 3, title: 'Voting Day', description: 'Get ready with your Epic ID!', status: 'pending' },
      { id: 4, title: 'Result Declaration', description: 'To be announced', status: 'pending' }
    ]
  });
});

// 2. Booth Finder Service
app.get('/api/booths', (req, res) => {
  const query = req.query.query; // EPIC or PIN
  if (!query) return res.status(400).json({ error: 'Query parameter required' });

  // Mock Geocode/Lookup logic
  let foundBooth = null;
  if (query.length === 6 && !isNaN(query)) {
    // Treat as PIN code (Mocking location lookup)
    foundBooth = db.booths[0]; // Just return the first one as a mock
  } else {
    // Treat as EPIC number
    const voter = db.voters.find(v => v.epic_number.toUpperCase() === query.toUpperCase());
    if (voter) {
      foundBooth = db.booths.find(b => b.booth_id === voter.polling_booth_id);
    }
  }

  if (foundBooth) {
    res.json({
      found: true,
      booth: {
        name: foundBooth.name,
        address: foundBooth.address,
        distance: '1.2 km away' // Mocked Haversine calculation
      }
    });
  } else {
    res.json({ found: false, message: 'Could not locate a polling booth for this input.' });
  }
});

// 3. Voter Status Service
app.get('/api/voter-status', (req, res) => {
  const epic = req.query.epic;
  if (!epic) return res.status(400).json({ error: 'EPIC parameter required' });

  // Cache check would go here in a real app
  const voter = db.voters.find(v => v.epic_number.toUpperCase() === epic.toUpperCase());
  
  if (voter) {
    res.json({
      registered: true,
      voter: {
        name: voter.name,
        constituency: voter.constituency,
        polling_booth_id: voter.polling_booth_id
      }
    });
  } else {
    res.json({ registered: false });
  }
});

// 4. Document Engine Service
app.post('/api/documents', (req, res) => {
  const { age, status } = req.body;

  if (!age || age < 18) {
    return res.json({ eligible: false, message: 'You must be 18 years or older to vote in India.' });
  }

  let documents = [];
  let actionLink = 'https://voters.eci.gov.in';

  if (status === 'first-time') {
    documents = [
      { type: 'Action Required', description: 'Fill Form 6 online' },
      { type: 'Age Proof', description: 'Aadhaar Card, PAN Card, or Birth Certificate' },
      { type: 'Address Proof', description: 'Passport, Bank Passbook, or Utility Bill' },
      { type: 'Photo', description: 'Recent passport size photograph' }
    ];
  } else if (status === 'moved') {
    documents = [
      { type: 'Action Required', description: 'Fill Form 8 online' },
      { type: 'Required', description: 'Existing EPIC (Voter ID) number' },
      { type: 'Address Proof', description: 'Rent agreement, utility bill, or Aadhaar with NEW address' }
    ];
  } else if (status === 'registered') {
    documents = [
      { type: 'Voting Day ID', description: 'Carry your Voter ID (EPIC) or Aadhaar Card to the booth' }
    ];
    actionLink = null; // No portal action needed
  }

  res.json({ eligible: true, documents, actionLink });
});

// 5. Reminder Scheduler Service
app.post('/api/reminders', (req, res) => {
  const { state, phone, rem1day, remMorning } = req.body;
  
  // Store user state preferences
  db.reminders.push({ state, phone, rem1day, remMorning, created_at: new Date() });
  
  // In a real app, a cron job (like node-cron) would read this array 
  // and trigger SMS APIs (like Twilio or AWS SNS) based on the state's election dates.

  res.json({ success: true, message: 'Reminders scheduled successfully' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`VoteSathi AI Backend running on http://localhost:${PORT}`);
});
