const express = require('express');
const router = express.Router();
// @route Get Request api/users/tes
// @desc Test users route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: "User Works"
}));
module.exports = router;