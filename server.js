const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'Online Quiz System' });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Quiz app running on port ${PORT}`);
});