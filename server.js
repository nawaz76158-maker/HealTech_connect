const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const familyRoutes = require('./routes/familyRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/family', familyRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'HealTech backend is working!' });
});

app.listen(3000, () => {
  console.log('HealTech server running on port 3000');
});