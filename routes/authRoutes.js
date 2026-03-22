const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/register', (req, res) => {
  const { name, email, password, role, patient_id } = req.body;
  db.query(
    'INSERT INTO users (name, email, password, role, patient_id) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, role, patient_id || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Registered successfully!', userId: result.insertId });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(401).json({ message: 'Invalid credentials' });
      res.json({ message: 'Login successful', user: results[0] });
    }
  );
});

module.exports = router;