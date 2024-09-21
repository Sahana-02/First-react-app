const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/proxy', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url, {
      headers: {
        'x-csrf-token': req.headers['x-csrf-token'],
        'x-device-id': req.headers['x-device-id'],
        'x-sid': req.headers['x-sid'],
        'x-tid': req.headers['x-tid'],
      }
    });
    res.send(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
