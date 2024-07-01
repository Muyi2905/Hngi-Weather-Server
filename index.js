require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${clientIp}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    const temperature = weatherResponse.data.main.temp;
    const location = weatherResponse.data.name;

    res.json({
      client_ip: clientIp,
      location: location,
      greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
