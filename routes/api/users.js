const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
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
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', //Rating
        d: 'mm' //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        date: req.body.genSalt
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    }
  });
});
module.exports = router;