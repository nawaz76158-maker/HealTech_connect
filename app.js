const express = require('express');
const router = express.Router();
const db = require('./config');

// NOW WE ARE CREATING THE DATA FOR DATABASE OR INSTERTING THE DATA
//  INSERT (CREATE)

router.post('/add-user', (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("User added");
    }
  });
});

router.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;