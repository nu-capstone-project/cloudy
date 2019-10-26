const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const passport = require('passport');

// @route POST api/files/upload
// @desc Upload user files
// @access Public

var userID = '';
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './files/' + userID);
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).array('file');

router.post('/upload', passport.authenticate('jwt', { session: false }), function(req, res) {
  userID = req.user._id;
  console.log('Incoming file upload from: ' + userID + ', ' + req.user.name);
  // check if directory exists
  if (!fs.existsSync('./files/' + userID)) {
    // if not create directory
    fs.mkdirSync('./files/' + userID);
  }

  upload(req, res, function(err) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

module.exports = router;
