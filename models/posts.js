const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USERS'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false, timestamps: true
});

module.exports = mongoose.model('POSTS', postSchema)