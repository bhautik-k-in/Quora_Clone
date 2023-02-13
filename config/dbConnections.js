const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((err) => console.log("ERROR WHILE CONNECTING TO THE DATABASE", err));

const USERS = require('../models/users');
const POSTS = require('../models/posts');
const TOPICS = require('../models/topics');
const ROLES = require('../models/roles');

module.exports = {
    USERS, TOPICS, ROLES, POSTS
}