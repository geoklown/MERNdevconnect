const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Post Model
const Post = require('../../models/Post');
// Profile Model
const Profile = require('../../models/Profile');
// Post Validation
const validatePostInput = require('../../validation/post');
// @route Get Request api/post/tes
// @desc Test Post route
// @access Public route
router.get('/test', (req, res) => res.json({
  msg: "Posts Works"
}));
// @route Get Request api/posts
// @desc Get Posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    }).then(posts => res.json(posts)).catch(err => res.status(404).json({
      nopostfound: 'I don\'t have that'
    }));
});
// @route Get single Request api/posts/:id
// @desc Get Posts by Id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post)).catch(err => res.status(404).json({
      nopostfound: 'I don\'t have that'
    }));
});
// @route DELETE api/posts/:id
// @desc delete Posts by Id
// @access Private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized: 'User not authorized'
          });
        }
        // Delete Post
        post.remove().then(() => res.json({
          success: true
        }));
      })
      .catch(err => res.status(404).json({
        nopostfound: 'I don\t have that'
      }));
  })
});
// @route Post Request api/posts/like/:id
// @desc Like Post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({
            alreadyliked: 'User already liked this post'
          });
        }
        // Add user id to likes array
        post.likes.unshift({
          user: req.user.id
        });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({
        nopostfound: 'I don\t have that'
      }));
  })
});

// @route Post Request api/posts
// @desc Create Post
// @access Private route

router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors send 400 with errors object
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
});

module.exports = router;