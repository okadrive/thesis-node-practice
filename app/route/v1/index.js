const express = require('express');
const router = express.Router();

router.use('/hello', require('./hello'));

module.exports = router;
