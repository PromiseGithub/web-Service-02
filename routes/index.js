const express = require('express');
const router = express.Router();

router.use('/individual', require('./individual'))

router.use('/snack', require('./snack'))

module.exports = router;