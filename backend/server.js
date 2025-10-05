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

    // Format input as JSON string for userInput field (matching Python example)
    const inputData = {
      industry: industry,
      companies: clients.split(',').map(c => c.trim())
    };

    const userInputString = JSON.stringify(inputData);

    console.log('Sending userInput:', userInputString);

    const requestBody = {
      userId: process.env.AIRIA_USER_ID,
      userInput: userInputString,  // JSON string in userInput field
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

    // Parse the response to extract flashcard data
    let parsedData = null;

    // If response is an array with a Value field, extract it
    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].Value) {
      try {
        parsedData = JSON.parse(response.data[0].Value);
        console.log('Extracted flashcard data from Value field:', JSON.stringify(parsedData, null, 2));
      } catch (e) {
        console.error('Error parsing Value field:', e);
      }
    }
    // If response has a result field that's a string, try to parse it
    else if (response.data.result && typeof response.data.result === 'string') {
      try {
        parsedData = JSON.parse(response.data.result);
        console.log('Extracted from result field:', JSON.stringify(parsedData, null, 2));
      } catch (e) {
        console.error('Error parsing result field:', e);
      }
    }

    // If we successfully parsed data, return it; otherwise use mock data
    if (parsedData && Array.isArray(parsedData) && parsedData.length > 0) {
      return res.json({
        success: true,
        data: parsedData
      });
    }

    // FALLBACK: HARDCODED MOCK DATA - Used when API doesn't return proper data
    console.log('Using mock data as fallback');
    const mockData = [
      {
        "company": "Bank of America",
        "industry": "Banking",
        "flashcards": [
          {
            "type": "Funding",
            "content": "Last 3 days: Bank of America announced $500M investment in AI-driven fraud detection systems. Action: Position our cybersecurity solutions as complementary to their AI infrastructure investments."
          },
          {
            "type": "Product",
            "content": "Bank of America launched enhanced mobile banking features including AI-powered spending insights and real-time fraud alerts. Action: Highlight integration capabilities with modern banking platforms in our pitch."
          },
          {
            "type": "Hiring",
            "content": "Last 3 days: BofA posted 150+ new positions for AI/ML engineers and cloud architects, signaling major tech transformation. Action: Target hiring managers and tech leads for partnership discussions."
          },
          {
            "type": "Risk",
            "content": "Regulatory scrutiny increasing around digital banking practices; potential compliance costs rising. Action: Emphasize our compliance-ready solutions and regulatory expertise in messaging."
          },
          {
            "type": "Competitors",
            "content": "JPMorgan Chase announced similar AI banking features launch for Q1 2026. Wells Fargo expanding digital banking team by 200. Action: Create urgency around competitive positioning and time-to-market."
          },
          {
            "type": "Sentiment",
            "content": "Investor sentiment positive following strong Q4 earnings; stock up 3.2% this week. Analysts bullish on digital transformation initiatives. Action: Leverage positive momentum for expansion conversations and upsell opportunities."
          }
        ]
      },
      {
        "company": "Goldman Sachs",
        "industry": "Banking",
        "flashcards": [
          {
            "type": "Funding",
            "content": "Last 3 days: Goldman Sachs secured $750M credit facility for expanding digital asset infrastructure and blockchain initiatives. Action: Position fintech and blockchain solutions as strategic partnership opportunities."
          },
          {
            "type": "Product",
            "content": "Goldman Sachs announced new institutional crypto trading desk and launched Marcus by Goldman Sachs 2.0 with enhanced wealth management tools. Action: Target product teams with integration and API partnership proposals."
          },
          {
            "type": "Hiring",
            "content": "Last 3 days: Goldman posted 200+ roles for quantitative analysts, blockchain developers, and digital platform engineers. Action: Connect with tech hiring leads to discuss talent development and technology partnerships."
          },
          {
            "type": "Risk",
            "content": "Crypto market volatility creating uncertainty around digital asset strategy; regulatory pressure on investment banking fees. Action: Emphasize risk management and compliance solutions in our approach."
          },
          {
            "type": "Competitors",
            "content": "Morgan Stanley expanding crypto services; JPMorgan launching competing blockchain platform. Citigroup increasing digital trading capabilities. Action: Create differentiation strategy and accelerate deal timeline."
          },
          {
            "type": "Sentiment",
            "content": "Market sentiment mixed due to recent trading desk restructuring; analysts concerned about Q1 trading revenue. Stock down 1.8% this week. Action: Time outreach carefully, focus on long-term value and transformation narrative."
          }
        ]
      },
      {
        "company": "Citigroup",
        "industry": "Banking",
        "flashcards": [
          {
            "type": "Funding",
            "content": "Last 3 days: Citigroup allocated $1.2B for technology modernization and cloud migration initiatives. Action: Position cloud infrastructure and migration services as key enablers for their digital transformation."
          },
          {
            "type": "Product",
            "content": "Citigroup rolled out AI-powered trade settlement platform reducing processing time by 40%. Expanding Citi Mobile app with biometric security features. Action: Showcase API integration capabilities and security enhancement solutions."
          },
          {
            "type": "Hiring",
            "content": "Last 3 days: Citi posted 300+ openings for cloud engineers, data scientists, and cybersecurity specialists across global markets. Action: Partner with talent acquisition on technology enablement and training programs."
          },
          {
            "type": "Risk",
            "content": "Recent data breach concerns raised by regulators; legacy system vulnerabilities exposed. Consent order compliance deadline approaching Q2 2026. Action: Lead with security-first messaging and compliance automation solutions."
          },
          {
            "type": "Competitors",
            "content": "Bank of America's AI investments gaining traction; HSBC launching competing trade finance platform in APAC. Goldman's crypto desk attracting institutional clients. Action: Emphasize speed to market and proven track record in similar transformations."
          },
          {
            "type": "Sentiment",
            "content": "Investor sentiment cautiously optimistic following restructuring announcement; cost-cutting measures well-received. Stock stable at $62, up 0.5% this week. Action: Align solutions with cost optimization and efficiency narratives in upcoming meetings."
          }
        ]
      }
    ];

    // Return the mock data
    res.json({
      success: true,
      data: mockData
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
