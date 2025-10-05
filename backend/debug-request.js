const axios = require('axios');
require('dotenv').config();

async function debug() {
  const industry = 'Banking';
  const clients = 'Bank of America, JPMorgan Chase & Co.';
  
  const companiesList = clients.split(',').map(c => c.trim()).join(', ');
  const chatStyleInput = `Industry: '${industry}', Potential Clients: '${companiesList}'`;

  const requestBody = {
    request: chatStyleInput,
    asyncOutput: false
  };

  console.log('=== DEBUG: What we are sending ===\n');
  console.log('Industry variable:', industry);
  console.log('Clients variable:', clients);
  console.log('Companies list:', companiesList);
  console.log('Formatted input string:', chatStyleInput);
  console.log('\nFull request body:');
  console.log(JSON.stringify(requestBody, null, 2));
  console.log('\n=== Sending to API ===\n');

  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      requestBody,
      {
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );

    console.log('Response received:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('Error:', error.response?.data || error.message);
  }
}

debug();
