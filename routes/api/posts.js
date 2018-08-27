const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// @route Get Request api/post/tes
// @desc Test Post route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: "Posts Works"
}));
module.exports = router;