const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post')
// @route Get Request api/post/tes
// @desc Test Post route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: "Posts Works"
}));
// @route Post Request api/posts
// @desc Create Post
// @access Private route

router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
});

module.exports = router;