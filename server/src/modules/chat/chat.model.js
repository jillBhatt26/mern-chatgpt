const { Schema, model } = require('mongoose');

const ChatSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Chat text is required'],
            trim: true
        },
        type: {
            type: String,
            enum: ['PROMPT', 'RESPONSE'],
            required: [true, 'Chat type is required'],
            default: ['PROMPT']
        },
        provider: {
            type: String,
            enum: ['OPENAI'],
            required: [true, 'Chat provider is required'],
            default: 'OPENAI'
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'auths',
            required: [true, 'Chat user is required']
        }
    },
    { timestamps: true }
);

const ChatModel = model('chats', ChatSchema);

module.exports = ChatModel;
