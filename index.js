// index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// GoHighLevel API endpoint
const GHL_API_URL = 'https://api.gohighlevel.com/v1/'; // Replace with actual endpoint
const GHL_API_KEY = 'YOUR_GHL_API_KEY'; // Replace with your GHL API key

// Accept Blue API endpoint
const ACCEPT_BLUE_API_URL = 'https://api.acceptblue.com/v1/'; // Replace with actual endpoint

// Endpoint to handle incoming requests from Accept Blue
app.post('/webhook', async (req, res) => {
    try {
        const data = req.body;

        // Process data and send to GoHighLevel
        const response = await axios.post(`${GHL_API_URL}/your-endpoint`, data, {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error sending data to GoHighLevel:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});