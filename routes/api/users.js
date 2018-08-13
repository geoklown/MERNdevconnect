const express = require('express');
const router = express.Router();
//Load user medel
const User = require('../../modules/User');
// @route Get Request api/users/tes
// @desc Test users route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: "User Works"
}));
// @route Get Request api/users/register
// @desc Register users
// @access Public route
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email Already Exists '
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
    }
  })
});
module.exports = router;