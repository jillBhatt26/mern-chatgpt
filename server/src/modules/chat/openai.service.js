const OpenAI = require('openai');
const CustomError = require('../../common/CustomError');
const openaiClient = require('../../config/openai');

class OpenAIService {
    generateText = (prompt, model = 'gpt-4.1-nano') =>
        new Promise(async (resolve, reject) => {
            try {
                const response = await openaiClient.response.create({
                    model,
                    input: prompt
                });

                return resolve(response.output_text);
            } catch (error) {
                if (error instanceof OpenAI.APIError)
                    return reject(new CustomError(error.name, error.status));

                return reject(
                    new CustomError(
                        error.message ?? 'Failed to generate text from prompt',
                        500
                    )
                );
            }
        });
}

module.exports = OpenAIService;
