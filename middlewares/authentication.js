const APIError = require("../utils/APIError");
const jwt = require('jsonwebtoken');
const { ROLES } = require("../config/dbConnections");

/**
 * AUTHENTCATE USERS
 * @param {*} roles 
 * @returns 
 */
exports.isAuth = (roles) => async (req, res, next) => { 
    try {
        const token = req.headers['authorization'] || null;
        if (!token) throw new APIError({ status: 401, message: "TOKEN is required" });

        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if (err) throw new APIError({ status: 401, message: "Unauthorized" });

            const role = await ROLES.findOne({ _id: data.role });
            if (!role) throw new APIError({ status: 401, message: "Unauthorized" });
            req.user = data;
            
            next();
        });
    } catch (error) {
        next(error);   
    }
}