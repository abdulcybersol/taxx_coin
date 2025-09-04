const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/api/coins', (req, res) => {
  const options = {
    hostname: 'api.coingecko.com',
    path: '/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0' // <-- important!
    }
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const json = JSON.parse(data);
        res.json(json);
      } catch (err) {
        console.error('JSON parse error:', err);
        res.status(500).json({ error: 'Error parsing API response' });
      }
    });
  });

  request.on('error', (err) => {
    console.error('HTTPS error:', err);
    res.status(500).json({ error: 'API request failed' });
  });

  request.end();
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
