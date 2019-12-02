const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const passport = require('passport');
const path = require('path');
const md5 = require('md5');

// @route POST api/files/upload
// @desc Upload user files
// @access Public

var userID = '';
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './files/' + userID);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({
  // disallow upload based on file name and extension
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) === '.js') {
      // return cb(new Error('JS not allowed')); <-- Completely aborts upload
      // Skip disallowed
      return cb(null, false);
    }
    cb(null, true);
  },
  storage: storage
}).array('file');

router.post('/upload', passport.authenticate('jwt', { session: false }), function (req, res) {
  userID = req.user._id;
  // check if directory exists
  if (!fs.existsSync('./files/' + userID)) {
    // if not create directory
    if (!fs.existsSync('./files')) fs.mkdirSync('./files');
    fs.mkdirSync('./files/' + userID);
  }
  // Download (upload at client) using multer
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    req.files.forEach(file => {
      var savedFile = './files/' + userID + '/' + file.originalname;
      // get all md5
      const userDir = path.join(__dirname + '../../../', 'files/' + userID);
      var md5CurrFile;
      fs.readFile(savedFile, (err, buf) => {
        md5CurrFile = md5(buf);
        fs.readdir(userDir, function (err, files) {
          files.forEach(file => {
            fileNameSplit = file.split('.');
            if (fileNameSplit[fileNameSplit.length - 1] == 'md5') {
              fs.readFile(userDir + '/' + file, 'utf8', (err, data) => {
                // compare md5
                if (data == md5CurrFile) {
                  // handle md5 duplicate
                  fs.unlink(savedFile, err => console.log(err));
                  fs.unlink(savedFile+'.md5', err => console.log(err));
                  // TODO: Show duplicate warning
                  // return res.status(409).json('duplicate');
                }
              })
            }
          });
        });
        // save md5
        fs.readFile(savedFile, (err, buf) => {
          fs.writeFile(savedFile + '.md5', md5CurrFile, () => 'done');
        });
      })


      //


      console.log('Upload for ' + userID + ', ' + req.user.name + ', of file ' + file.originalname + ' complete')
    })
    return res.status(200).send(req.file);
  });
});

// @route POST api/files/list
// @desc List user files
// @access Public

router.post('/list', passport.authenticate('jwt', { session: false }), function (req, res) {
  userID = req.user._id;
  const userDir = path.join(__dirname + '../../../', 'files/' + userID);
  fs.readdir(userDir, function (err, files) {
    if (err) {
      return res.status(400).json(err);
    }
    let fileObjects = [];

    files.forEach(file => {
      // do not display md5 files
      fileNameSplit = file.split('.');
      if (fileNameSplit[fileNameSplit.length - 1] != 'md5') {
        fileObjects.push({
          name: file,
          modified: fs.statSync(path.join(userDir, file)).mtime,
          size: fs.statSync(path.join(userDir, file)).size
        });
      }
    });
    return res.status(200).send(fileObjects);
  });
});

// @route DELETE api/files/delete
// @desc Delete user files
// @access Public

router.delete('/delete/:fileName', passport.authenticate('jwt', { session: false }), function (req, res) {
  userID = req.user._id;
  const userDir = path.join(__dirname + '../../../', 'files/' + userID);
  fs.unlink(path.join(userDir + '/' + req.params.fileName), err => {
    if (err) return res.status(400).json(err);
    return res.status(200).json('deleted');
  });
  fs.unlink(path.join(userDir + '/' + req.params.fileName+'.md5'), err => {});
});

// @route POST api/files/rename
// @desc Rename user files
// @access Public

router.post('/rename/:oldName', passport.authenticate('jwt', { session: false }), function (req, res) {
  userID = req.user._id;
  const userDir = path.join(__dirname + '../../../', 'files/' + userID);
  fs.rename(
    path.join(userDir + '/' + req.params.oldName),
    path.join(userDir + '/' + req.body.newName),
    err => {
      if (err) return res.status(400).json(err);
      return res.status(200).json('renamed');
    }
  );
});

// @route GET api/files/get
// @desc Download user files
// @access Public

router.get('/get/:fileName', passport.authenticate('jwt', { session: false }), function (req, res) {
  userID = req.user._id;
  const userDir = path.join(__dirname + '../../../', 'files/' + userID);
  const filePath = path.join(userDir, req.params.fileName);
  fs.exists(filePath, exists => {
    if (exists) return res.download(filePath);
    return res.status(404);
  });
});

module.exports = router;
