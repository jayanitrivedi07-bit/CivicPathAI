const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { 
  voterStatusValidator, 
  boothValidator, 
  documentsValidator, 
  reminderValidator 
} = require('../middleware/validator');

router.get('/timeline', apiController.getTimeline);
router.get('/booths', boothValidator, apiController.getBooths);
router.get('/voter-status', voterStatusValidator, apiController.getVoterStatus);
router.post('/documents', documentsValidator, apiController.getDocuments);
router.post('/reminders', reminderValidator, apiController.setReminders);

module.exports = router;
