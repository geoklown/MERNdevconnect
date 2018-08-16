const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');
// @route Get Request api/profile/tes
// @desc Test profile route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: "Profile Works"
}));
// @route Get Request api/profile
// @desc Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {};
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
// @route Post Request api/profile
// @desc Create or edit users profile
// @access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  // Get Fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (res.body.handle) profileFields.handle = req.body.handle;
  if (res.body.company) profileFields.company = req.body.company;
  if (res.body.website) profileFields.website = req.body.website;
  if (res.body.location) profileFields.location = req.body.location;
  if (res.body.bio) profileFields.bio = req.body.bio;
  if (res.body.status) profileFields.status = req.body.status;
  if (res.body.githubusername) profileFields.githubusername = req.body.githubusername;
  // Skills Split into an ARRAY
  if (typeof req.body.skills !== 'undifined') {
    // Split into at CSV
    profileFields.skills = req.body.skills.split(',');
  }
  // Social Fields
  profileFields.social = {};
  if (res.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (res.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (res.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (res.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (res.body.instagram) profileFields.social.instagram = req.body.instagram;
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate({
            user: req.user.id
          }, {
            $set: profileFields
          }, {
            new: true
          })
          .then(profile => res.json(profile));
      } else {
        // Create

        // Check for handle 
        Profile.findOne({
            handle: profileFields.handle
          })
          .then(profile => {
            if (profile) {
              errors.handle = 'Than Handle already Exists';
              res.status(400).json(errors);
            }
            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
      }
    });
});




module.exports = router;