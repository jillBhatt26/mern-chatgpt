const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('./env');

const openaiClient = new OpenAI({
    apiKey: OPENAI_API_KEY
});

module.exports = openaiClient;
