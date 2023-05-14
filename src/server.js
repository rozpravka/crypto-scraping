const express = require('express');
require('dotenv').config();

const { mongoConnect } = require('./services/mongo');
const { getCryptoData } = require('./controllers/scraper');

const app = express();
const PORT = process.env.PORT || 8000;
cryptos = [];

async function startServer() {
  await mongoConnect();
  cryptos = await getCryptoData();
  
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

app.get('/', async (req, res) => {
    try {
        res.status(200).json({ 
            cryptos
        });
    } catch (error) {
        return res.status(500).json({ 
            error: error.message,
        });
    }
});
