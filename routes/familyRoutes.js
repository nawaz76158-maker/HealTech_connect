const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/logs/:patient_id', (req, res) => {
  const { patient_id } = req.params;
  db.query(
    `SELECT h.*, u.name as patient_name
     FROM health_logs h
     JOIN users u ON h.patient_id = u.id
     WHERE h.patient_id = ?
     ORDER BY h.created_at DESC`,
    [patient_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

router.get('/reminders/:patient_id', (req, res) => {
  const { patient_id } = req.params;
  db.query(
    'SELECT * FROM reminders WHERE patient_id = ?',
    [patient_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

router.post('/reminders', (req, res) => {
  const { patient_id, medicine_name, reminder_time } = req.body;
  db.query(
    'INSERT INTO reminders (patient_id, medicine_name, reminder_time) VALUES (?, ?, ?)',
    [patient_id, medicine_name, reminder_time],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Reminder added!' });
    }
  );
});

module.exports = router;

/*
  Your Action Plan Before 26th
```
Today → Paste all route files, test in Postman
21st  → GitHub repo created, team clones it
22nd  → Full project tested together
23rd  → Presentation ready, demo practiced
24th  → Buffer day for fixes
25th  → Rest
26th  → Hackathon. Confident. Ready.  
*/