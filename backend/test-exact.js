const axios = require('axios');
require('dotenv').config();

async function test() {
  // Exact format from playground
  const playgroundInput = {
    "industry": "Banking",
    "companies": [
      "JPMorgan Chase & Co.",
      "Bank of America",
      "Citigroup"
    ]
  };

  console.log('Test 1: Sending as request object...\n');
  
  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      {
        request: playgroundInput,
        asyncOutput: false
      },
      {
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );

    console.log('✅ Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 2: Try as direct payload (no request wrapper)
  console.log('Test 2: Sending as direct payload...\n');
  
  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      playgroundInput,
      {
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );

    console.log('✅ Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 3: Try with asyncOutput: true
  console.log('Test 3: Sending with asyncOutput: true...\n');
  
  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      {
        request: playgroundInput,
        asyncOutput: true
      },
      {
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );

    console.log('✅ Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
}

test();
