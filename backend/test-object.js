const axios = require('axios');
require('dotenv').config();

async function test() {
  const structuredInput = {
    industry: 'Banking',
    companies: ['JPMorgan Chase & Co.', 'Bank of America']
  };

  console.log('Testing with JSON object (not stringified)...\n');
  console.log('Payload:', JSON.stringify({
    request: structuredInput,
    asyncOutput: false
  }, null, 2));
  console.log('\n');

  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      {
        request: structuredInput,
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

    console.log('✅ SUCCESS!\n');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ FAILED\n');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

test();
