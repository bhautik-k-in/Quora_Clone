const { USERS, ROLES } = require("../config/dbConnections");
const APIError = require("../utils/APIError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * LOGIN
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email != req.user.email) throw new APIError({ status: 401, message: "You do not have permission to access this" });

        const isUserExist = await USERS.findOne({ email });
        if (!isUserExist) throw new APIError({ status: 404, message: "User does not exist" });

        const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordCorrect) throw new APIError({ status: 401, message: "Email or password do not match" });

        const token = jwt.sign(isUserExist.toJSON(), process.env.SECRET);
        return res.sendJson(200, "Login Successful", token);
    } catch (error) {
        next(error);
    }
}

/**
 * REGISTER
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const isUserExist = await USERS.findOne({ email });
        if (isUserExist) throw new APIError({ status: 422, data: "User already exists. Please try to login" });

        const userRole = await ROLES.findOne({ name: "users"});
        const newUser = (await USERS.create({ email, name, password, role: userRole._id })).toObject();
        delete newUser.password;
        delete newUser.role;

        return res.sendJson(201, "User created successfully", newUser);
    } catch (error) {
        next(error);
    }
}

/**
 * PROFILE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.profile = async (req, res, next) => {
    try {
        const { email } = req.query;

        if (email != req.user.email) throw new APIError({ status: 401, message: "You do not have permission to access this" });

        const user = (await USERS.findOne({ email })).toObject();
        if (!user) throw new APIError({ status: 404, message: "User does not exist" });

        delete user.password;
        delete user.role;

        return res.sendJson(200, "User Profile", user);
    } catch (error) {
        next(error);
    }
}

exports.posts = async (req, res, next) => {
    try {
        // posts
    } catch (error) {

    }
}

exports.topics = async (req, res, next) => {
    try {
        // topics
    } catch (error) {

    }
}