const { body, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.voterStatusValidator = [
  query('epic').notEmpty().withMessage('EPIC parameter required').isAlphanumeric().withMessage('Invalid EPIC format'),
  validate
];

exports.boothValidator = [
  query('query').notEmpty().withMessage('Query parameter required'),
  validate
];

exports.documentsValidator = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Valid age is required'),
  body('status').isIn(['first-time', 'moved', 'registered']).withMessage('Invalid status'),
  validate
];

exports.reminderValidator = [
  body('state').notEmpty().withMessage('State is required'),
  body('phone').isMobilePhone('en-IN').withMessage('Valid Indian mobile number is required'),
  body('rem1day').isBoolean(),
  body('remMorning').isBoolean(),
  validate
];
