import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw HttpError(409, "Email in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw HttpError(401, "Email or password is wrong");
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

        user.token = token;
        await user.save();

        res.status(200).json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res, next) => {
    try {
        req.user.token = null;
        await req.user.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            email: req.user.email,
            subscription: req.user.subscription,
        });
    } catch (error) {
        next(error);
    }
};
