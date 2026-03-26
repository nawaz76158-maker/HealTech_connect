const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/symptoms', async (req, res) => {
    const { patient_id, symptoms } = req.body;
    try {
        // 1. Call Claude AI
        const message = await client.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1024,
            messages: [{ 
                role: "user", 
                content: `You are a helpful health assistant. Patient symptoms: ${symptoms}. Give simple clear advice in 3-4 lines.` 
            }]
        });

        // 2. Get the response text
        const ai_response = message.content[0].text;

        // 3. Save to Database
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
        res.status(500).json({ error: "AI Assistant failed to respond." });
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




