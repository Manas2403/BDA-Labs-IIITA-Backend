import User from "../models/user.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");
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
    const imgName = randomImageName();
    const params = {
        Bucket: bucketName,
        Key: imgName,
        Body: req.file.buffer,
        ContentType: req.file.mimeType,
    };
    const data = await s3.send(new PutObjectCommand(params));
    console.log(data);

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
    console.log(user);
    const getObjectParams = {
        Bucket: bucketName,
        Key: user.profileImg,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return response_200(res, "User found successfully", { user, url });
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
