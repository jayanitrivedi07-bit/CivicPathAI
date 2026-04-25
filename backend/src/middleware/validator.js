const { body, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => ({ field: err.param, message: err.msg })) });
  }
  next();
};

// Stricter sanitization and validation
exports.voterStatusValidator = [
  query('epic')
    .trim()
    .notEmpty().withMessage('EPIC number is required')
    .isLength({ min: 10, max: 12 }).withMessage('EPIC number must be 10-12 characters')
    .matches(/^[A-Z]{3}[0-9]{7,10}$/i).withMessage('Invalid EPIC format (e.g., ABC1234567)'),
  validate
];

exports.boothValidator = [
  query('query')
    .trim()
    .notEmpty().withMessage('Search query is required')
    .escape(),
  validate
];

exports.documentsValidator = [
  body('age')
    .isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('status')
    .isIn(['first-time', 'moved', 'registered']).withMessage('Invalid voting status'),
  validate
];

exports.reminderValidator = [
  body('state').trim().notEmpty().withMessage('State is required').escape(),
  body('phone')
    .isMobilePhone('en-IN').withMessage('A valid Indian 10-digit mobile number is required'),
  body('rem1day').isBoolean(),
  body('remMorning').isBoolean(),
  validate
];
