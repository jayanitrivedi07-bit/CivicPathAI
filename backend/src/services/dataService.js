// Mock Database Service
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

const getVoterByEpic = (epic) => {
  return db.voters.find(v => v.epic_number.toUpperCase() === epic.toUpperCase());
};

const getBoothById = (id) => {
  return db.booths.find(b => b.booth_id === id);
};

const getAllBooths = () => {
  return db.booths;
};

const addReminder = (reminder) => {
  db.reminders.push({ ...reminder, created_at: new Date() });
  return true;
};

module.exports = {
  getVoterByEpic,
  getBoothById,
  getAllBooths,
  addReminder
};
