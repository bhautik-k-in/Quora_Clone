const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subscribes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USERS"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'POSTS'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false, timestamps: true
});

module.exports = mongoose.model('TOPICS', topicSchema)