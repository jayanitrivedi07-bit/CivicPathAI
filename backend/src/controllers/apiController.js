const dataService = require('../services/dataService');
const googleMapsService = require('../services/googleMapsService');
const cacheService = require('../services/cacheService');

exports.getTimeline = async (req, res) => {
  try {
    const timeline = await dataService.getTimeline();
    // Sort by ID if available
    timeline.sort((a, b) => (a.id || 0) - (b.id || 0));
    res.json({ timeline: timeline.length > 0 ? timeline : [
      { id: 1, title: 'Voter Registration', description: 'Closes 10 days before polling', status: 'completed' },
      { id: 2, title: 'Candidate Nominations', description: 'Currently in progress', status: 'active' },
      { id: 3, title: 'Voting Day', description: 'Get ready with your Epic ID!', status: 'pending' },
      { id: 4, title: 'Result Declaration', description: 'To be announced', status: 'pending' }
    ]});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
};

exports.getBooths = async (req, res) => {
  const { query } = req.query;
  
  try {
    let foundBooth = null;
    if (query.length === 6 && !isNaN(query)) {
      // PIN code logic: Use Geocoding to find nearby booth (simulated logic)
      const coords = await googleMapsService.geocodeAddress(query);
      const booths = await dataService.getAllBooths();
      // Simple logic: return first booth for now, or find closest (can be expanded)
      foundBooth = booths[0]; 
    } else {
      // EPIC number logic
      const voter = await dataService.getVoterByEpic(query);
      if (voter) {
        foundBooth = await dataService.getBoothById(voter.polling_booth_id);
      }
    }

    if (foundBooth) {
      res.json({
        found: true,
        booth: {
          name: foundBooth.name,
          address: foundBooth.address,
          distance: 'Calculated from your location',
          google_maps_url: googleMapsService.getDirectionsUrl(foundBooth.lat, foundBooth.lng),
          embed_url: googleMapsService.getEmbedUrl(foundBooth.lat, foundBooth.lng)
        }
      });
    } else {
      res.json({ found: false, message: 'Could not locate a polling booth for this input.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to search for booths' });
  }
};

exports.getVoterStatus = async (req, res) => {
  const { epic } = req.query;
  
  const cached = cacheService.get(`voter:${epic}`);
  if (cached) return res.json({ ...cached, cached: true });

  try {
    const voter = await dataService.getVoterByEpic(epic);
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

    cacheService.set(`voter:${epic}`, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch voter status' });
  }
};

exports.getDocuments = (req, res) => {
  const { age, status } = req.body;
  if (age < 18) {
    return res.json({ eligible: false, message: 'You must be 18 years or older to vote in India.' });
  }
  // ... (rest of logic remains same as it's rule-based)

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
