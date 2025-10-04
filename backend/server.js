const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Main endpoint to call Aria agent
app.post('/run-agent', async (req, res) => {
  try {
    const { industry, clients } = req.body;

    // Validate input
    if (!industry || !clients) {
      return res.status(400).json({
        error: 'Missing required fields: industry and clients'
      });
    }

    // Check for API credentials
    if (!process.env.AIRIA_API_KEY || !process.env.AIRIA_USER_ID) {
      return res.status(500).json({
        error: 'Server configuration error: Missing API credentials'
      });
    }

    // Extract GUID from userId if it contains "Embedded Chat - " prefix
    let userId = process.env.AIRIA_USER_ID.trim();
    if (userId.includes('Embedded Chat - ')) {
      userId = userId.split('Embedded Chat - ')[1].trim();
    }

    // Try sending the data as JSON embedded in the request
    // The pipeline seems to expect structured data, not natural language
    const structuredInput = JSON.stringify({
      industry: industry,
      potential_clients: clients.split(',').map(c => c.trim())
    });

    console.log('Sending structured input:', structuredInput);

    const requestBody = {
      userId: userId,
      request: structuredInput,
      asyncOutput: false
    };

    console.log('Request payload:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      requestBody,
      {
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 2 minutes for data fetching
      }
    );

    console.log('Aria API response received');
    console.log('Response data:', JSON.stringify(response.data, null, 2));

    // Return the response data
    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error calling Aria API:', error.message);

    // Log full error details for debugging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      console.error('Response headers:', error.response.headers);
    }

    if (error.response) {
      // API returned an error response
      res.status(error.response.status).json({
        error: 'Aria API error',
        message: error.response.data?.message || error.message,
        details: error.response.data
      });
    } else if (error.request) {
      // Request was made but no response received
      res.status(503).json({
        error: 'Service unavailable',
        message: 'No response from Aria API'
      });
    } else {
      // Other errors
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API credentials configured: ${!!process.env.AIRIA_API_KEY && !!process.env.AIRIA_USER_ID}`);
});
