import User from "../models/user.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import path from "path";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
export const registerUser = async (req, res) => {
    const {
        username,
        password,
        about,
        mobile,
        researchInterests,
        name,
        address,
    } = req.body;

    if (!username || !password || !name)
        return response_400(res, "Please fill all fields");

    if (!req.file) return response_400(res, "Profile image is required");

    const imgName = req.file ? req.file.filename.replace(/\s/g, "_") : null;

    User.register(
        {
            name,
            username,
            about,
            mobile,
            researchInterests,
            address,
            profileImg: imgName,
            publications: [],
        },
        password,
        (err, user) => {
            if (err) {
                console.log(err);
                return response_500(res, "Error registering user", err);
            }
            let token = jwt.sign({ user }, process.env.SESSION_SECRET, {
                expiresIn: "30d",
            });
            return response_200(res, "User registered successfully", {
                token,
                user,
            });
        }
    );
};

export const loginUser = (req, res) => {
    let token = jwt.sign({ user: req.user }, process.env.SESSION_SECRET, {
        expiresIn: "30d",
    });
    return response_200(res, "User logged in successfully", {
        token,
        user: req.user,
    });
};

export const getUser = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username: username });

    if (!user) return response_400(res, "User not found");

    const imageUrl = `${BASE_URL}/uploads/${user.profileImg}`;

    return response_200(res, "User found successfully", { user, imageUrl });
};

export const addPublication = async (req, res) => {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({ username: username });
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
        return response_400(res, "Please fill all fields");
    }
    let publication = {
        title: title,
        description: description,
        link: link,
    };
    try {
        console.log(user.publications);
        user.publications.push(publication);
        await user.save();
        return response_200(res, "Publication added successfully");
    } catch (err) {
        return response_500(res, "Error adding publication", err);
    }
};
