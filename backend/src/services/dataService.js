const firebaseService = require('./firebaseService');

// This service now wraps Firestore operations
const getVoterByEpic = async (epic) => {
  return await firebaseService.getVoterByEpic(epic);
};

const getBoothById = async (id) => {
  return await firebaseService.getDoc('booths', id);
};

const getAllBooths = async () => {
  return await firebaseService.getAllDocs('booths');
};

const getTimeline = async () => {
  return await firebaseService.getAllDocs('timeline');
};

const addReminder = async (reminder) => {
  await firebaseService.addReminder(reminder);
  return true;
};

module.exports = {
  getVoterByEpic,
  getBoothById,
  getAllBooths,
  getTimeline,
  addReminder
};
