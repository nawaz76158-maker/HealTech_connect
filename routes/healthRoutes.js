const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apikey: process.env.GROQ_API_KEY });

router.post('/symptoms', async (req, res) => {
const { patient_id, symptoms } = req.body;  
  try { 
    const completion = await groq.chat.completions.create({
   messages: [
    { 
      role: 'user',
      content: `You are a helpful health assistant.
      Patient symptoms: ${symptoms}.
      Give simple clear health advice in 3 to 4 lines.
      Always suggest consulting a doctor for serious symptoms.`
    }
  ],
  model: 'llama-3.3-70b-versatile'
});

const ai_response = completion.choices[0].message.content;

db.query(
'INSERT INTO health_logs (patient_id, symptoms, ai_response) VALUES (?, ?, ?)',
[patient_id, symptoms, ai_response],
(err) => {
if (err) return res.status(500).json({ error: err.message });     
res.json({ message: 'Symptoms logged', ai_response });
}
);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: err.message });
  }
});

router.get('/logs/:patient_id', (req, res) => {
const { patient_id } = req.params;
db.query(
'SELECT * FROM health_logs WHERE patient_id = ? ORDER BY created_at DESC',
[patient_id],
(err, results) => {
if (err) return res.status(500).json({ error: err.message });
res.json(results);
}
);
});

module.exports = router;  




