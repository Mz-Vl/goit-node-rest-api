import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer" || !token) {
            throw HttpError(401, "Not authorized");
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findByPk(id);

        if (!user || user.token !== token) {
            throw HttpError(401, "Not authorized");
        }

        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401, "Not authorized"));
    }
};
