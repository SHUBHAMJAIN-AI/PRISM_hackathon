require('dotenv').config();
console.log('API Key exists:', process.env.AIRIA_API_KEY ? 'YES' : 'NO');
console.log('User ID exists:', process.env.AIRIA_USER_ID ? 'YES' : 'NO');
if (process.env.AIRIA_API_KEY) {
  console.log('API Key length:', process.env.AIRIA_API_KEY.length);
  console.log('API Key starts with:', process.env.AIRIA_API_KEY.substring(0, 10));
}
