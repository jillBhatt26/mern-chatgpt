const yup = require('yup');

const createPromptChatBodySchema = yup.object({
    text: yup.string().trim().required('Prompt text is required')
});

module.exports = {
    createPromptChatBodySchema
};
