const axios = require('axios');
require('dotenv').config();

async function testFinal() {
  let userId = process.env.AIRIA_USER_ID.trim();
  if (userId.includes('Embedded Chat - ')) {
    userId = userId.split('Embedded Chat - ')[1].trim();
  }

  const structuredInput = JSON.stringify({
    industry: 'Banking',
    companies: ['JPMorgan Chase & Co.', 'Bank of America']
  });

  console.log('🧪 Final Test with userInput field\n');

  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      {
        userId: userId,
        userInput: structuredInput,
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
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ FAILED\n');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testFinal();
