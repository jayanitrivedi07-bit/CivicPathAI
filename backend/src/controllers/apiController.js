const dataService = require('../services/dataService');
const googleMapsService = require('../services/googleMapsService');
const cacheService = require('../services/cacheService');

exports.getTimeline = (req, res) => {
  res.json({
    timeline: [
      { id: 1, title: 'Voter Registration', description: 'Closes 10 days before polling', status: 'completed' },
      { id: 2, title: 'Candidate Nominations', description: 'Currently in progress', status: 'active' },
      { id: 3, title: 'Voting Day', description: 'Get ready with your Epic ID!', status: 'pending' },
      { id: 4, title: 'Result Declaration', description: 'To be announced', status: 'pending' }
    ]
  });
};

exports.getBooths = (req, res) => {
  const { query } = req.query;
  
  let foundBooth = null;
  if (query.length === 6 && !isNaN(query)) {
    // PIN code logic
    foundBooth = dataService.getAllBooths()[0];
  } else {
    // EPIC number logic
    const voter = dataService.getVoterByEpic(query);
    if (voter) {
      foundBooth = dataService.getBoothById(voter.polling_booth_id);
    }
  }

  if (foundBooth) {
    res.json({
      found: true,
      booth: {
        name: foundBooth.name,
        address: foundBooth.address,
        distance: '1.2 km away',
        google_maps_url: googleMapsService.getDirectionsUrl(foundBooth.lat, foundBooth.lng)
      }
    });
  } else {
    res.json({ found: false, message: 'Could not locate a polling booth for this input.' });
  }
};

exports.getVoterStatus = (req, res) => {
  const { epic } = req.query;
  
  // Try cache first
  const cached = cacheService.get(`voter:${epic}`);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  const voter = dataService.getVoterByEpic(epic);
  
  let result;
  if (voter) {
    result = {
      registered: true,
      voter: {
        name: voter.name,
        constituency: voter.constituency,
        polling_booth_id: voter.polling_booth_id
      }
    };
  } else {
    result = { registered: false };
  }

  // Cache the result
  cacheService.set(`voter:${epic}`, result);
  res.json(result);
};

exports.getDocuments = (req, res) => {
  const { age, status } = req.body;

  if (age < 18) {
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
    actionLink = null;
  }

  res.json({ eligible: true, documents, actionLink });
};

exports.setReminders = (req, res) => {
  const { state, phone, rem1day, remMorning } = req.body;
  dataService.addReminder({ state, phone, rem1day, remMorning });
  res.json({ success: true, message: 'Reminders scheduled successfully' });
};
