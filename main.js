const express = require("express")
const axios = require("axios")

const app = express();
const PORT = process.env.PORT || 3000

app.get("/api/hello", async (req, res) => {
    const visitor = req.query.visitor
const clientIp = req.ip

try {
    const locationResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const locationData = locationResponse.data 
    const city = locationData.city 
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a84ad6ad0eaf0a2392b953262ba97508`);
    const weatherData = weatherResponse.data;
    const Temperature = weatherData.main.temp;

    const

} catch (error) {
    
}


}
)