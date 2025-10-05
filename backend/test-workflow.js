const axios = require('axios');
require('dotenv').config();

async function testWorkflow() {
  // Extract GUID from userId
  let userId = process.env.AIRIA_USER_ID.trim();
  if (userId.includes('Embedded Chat - ')) {
    userId = userId.split('Embedded Chat - ')[1].trim();
  }

  const industry = 'Banking';
  const companies = ['JPMorgan Chase & Co.', 'Bank of America', 'Citigroup'];

  // Format as JSON like in the playground
  const structuredInput = JSON.stringify({
    industry: industry,
    companies: companies
  });

  console.log('🧪 Testing PRISM Workflow\n');
  console.log('Input Data:');
  console.log('  Industry:', industry);
  console.log('  Companies:', companies.join(', '));
  console.log('\nSending to Aria API...\n');

  try {
    const response = await axios.post(
      'https://api.airia.ai/v2/PipelineExecution/1f015b52-559c-4113-9d5a-1630274180db',
      {
        userId: userId,
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
    console.log('Response Data:');
    console.log(JSON.stringify(response.data, null, 2));

    // Check if we got actual results or just instructions
    if (response.data.result) {
      const result = response.data.result;
      if (result.includes('awaiting_input') || result.includes('error') || result.includes('Please provide')) {
        console.log('\n⚠️  WARNING: Pipeline returned instructions instead of results');
        console.log('This means the pipeline is not executing properly');
      } else {
        console.log('\n🎉 Pipeline executed successfully and returned results!');
      }
    }

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

testWorkflow();
