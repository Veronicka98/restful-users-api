var User = require('../models/user');
var express = require('express');
var router = express.Router();


// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// DELETE /users/:id
// Delete a user by ID
router.delete('/:id', function(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error deleting user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json({ message: 'User deleted' });
  });
});

// POST /users/:id
// Create a user
router.post('/', function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error adding user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json( user );
  });
});


module.exports = router;
