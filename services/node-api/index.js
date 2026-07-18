const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8001';

app.post('/search', async (req, res) => {
  try {
    const resp = await fetch(`${FASTAPI_URL}/search`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req.body)
    });
    const json = await resp.json();
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'failed to reach fastapi service'});
  }
});

app.get('/health', (req, res) => res.json({status: 'ok'}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node API gateway listening on ${port}`));
