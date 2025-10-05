const axios = require('axios');
require('dotenv').config();

async function testAuth() {
  let userId = process.env.AIRIA_USER_ID.trim();
  if (userId.includes('Embedded Chat - ')) {
    userId = userId.split('Embedded Chat - ')[1].trim();
  }

  const payload = {
    userId: userId,
    userInput: "Example user input",
    asyncOutput: false
  };

  console.log('Testing authentication methods...\n');
  console.log('API Key starts with:', process.env.AIRIA_API_KEY.substring(0, 15));
  console.log('User ID:', userId);
  console.log('\n');

  // Test 1: X-API-KEY header (original curl example)
  console.log('Test 1: Using X-API-KEY header...');
  try {
    const response1 = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      payload,
      {
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );
    console.log('✅ X-API-KEY works!');
    console.log('Response:', JSON.stringify(response1.data, null, 2));
  } catch (error) {
    console.log('❌ X-API-KEY failed');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data || error.message);
  }

  console.log('\n---\n');

  // Test 2: Authorization Bearer header
  console.log('Test 2: Using Authorization Bearer header...');
  try {
    const response2 = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.AIRIA_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );
    console.log('✅ Bearer token works!');
    console.log('Response:', JSON.stringify(response2.data, null, 2));
  } catch (error) {
    console.log('❌ Bearer token failed');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data || error.message);
  }
}

testAuth();
