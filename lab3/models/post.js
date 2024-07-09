import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    writer: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export default mongoose.model("Post", postSchema);
