const express = require("express")
const axios = require("axios")
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000

app.get("/api/hello", async (req, res) => {
const visitor = req.query.visitor
const clientIp = req.ip

try {
    const locationResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const locationData = locationResponse.data 
    const city = locationData.city 
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const weatherData = weatherResponse.data;
    const Temperature = weatherData.main.temp;

    const response = {
        client_IpAddress : clientIp,
        location : locationData,
        Temperature : Temperature,
       greeting: `Hello, ${visitor}! The temperature is ${Temperature} degrees Celsius in ${city}`
    }

    res.json(response)

} catch (error) {
    console.error(error)
    res.status(500).send('internal Server Error')
    
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

})

