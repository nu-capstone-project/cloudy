const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const passport = require('passport');
const path = require('path');

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

var upload = multer({
  // disallow upload based on file name and extension
  fileFilter: function(req, file, cb) {
    if (path.extname(file.originalname) === '.js') {
      // return cb(new Error('JS not allowed')); <-- Completely aborts upload
      // Skip disallowed
      return cb(null, false);
    }
    cb(null, true);
  },
  storage: storage
}).array('file');

router.post('/upload', passport.authenticate('jwt', { session: false }), function(req, res) {
  userID = req.user._id;
  // console.log('Incoming file upload from: ' + userID + ', ' + req.user.name);
  // check if directory exists
  if (!fs.existsSync('./files/' + userID)) {
    // if not create directory
    if(!fs.existsSync('./files')) fs.mkdirSync('./files');
    fs.mkdirSync('./files/' + userID);
  }

  upload(req, res, function(err) {
    if (err) {
      return res.status(500).json(err);
    }
    console.log('Upload for ' + userID + ' of file ' + req.files[0].originalname + ' complete');
    return res.status(200).send(req.file);
  });
});

// @route POST api/files/list
// @desc List user files
// @access Public

module.exports = router;
