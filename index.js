app.get("/api/hello", async (req, res) => {
    const visitor = req.query.visitor;
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        console.log('Client IP:', clientIp);
        const locationResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
        const locationData = locationResponse.data;
        console.log('Location data:', locationData);

        const city = locationData.city;
        console.log('City:', city);

        if (!city) {
            throw new Error('Unable to determine city from IP address');
        }

        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = weatherResponse.data;
        const temperature = weatherData.main.temp;

        const response = {
            client_IpAddress: clientIp,
            location: locationData,
            temperature: temperature,
            greeting: `Hello, ${visitor}! The temperature is ${temperature} degrees Celsius in ${city}`
        };

        res.json(response);
    } catch (error) {
        console.error('Error details:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        res.status(500).send('Internal Server Error');
    }
});