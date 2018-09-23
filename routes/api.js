const express = require('express');
const router = express.Router();
const fs = require('fs');

const child_care = require('../database/child-care');

router.get('/childCare', function (req, res) {
  res.status(200).json(child_care);
})
router.get('/dentalcare', function (req, res) {
  fs.readFile("../public/dentalcare.json", function (err, data) {
    if (err) {
      console.log(err)
    }
    res.status(200).json();
  })

})

module.exports = router;